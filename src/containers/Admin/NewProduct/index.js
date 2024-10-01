import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import { ErrorMessage } from '../../../components'
import paths from '../../../constants/path'
import api from '../../../services/api'
import {
  Container,
  Label,
  Input,
  FormButton,
  LabelUpload,
  ImagePreview
} from './styles'

function NewProduct() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [categories, setCategories] = useState()
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o Nome do produto'),
    price: Yup.string().required('Digite o Preço do produto'),
    category: Yup.object().required('Escolha uma Categoria'),
    file: Yup.mixed().test('required', 'Carregue um arquivo', value => {
      return value?.length > 0
    })
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    const productDataFormData = new FormData()
    productDataFormData.append('name', data.name)
    productDataFormData.append('price', data.price)
    productDataFormData.append('file', data.file[0])
    productDataFormData.append('category_id', data.category.id)

    await toast.promise(api.post('products', productDataFormData), {
      pending: 'Criando novo produto',
      success: 'Produto criado com sucesso',
      error: 'Falha ao criar o produto'
    })

    setTimeout(() => {
      navigate(paths.Products)
    }, 1000)
  }

  const handleImageChange = e => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreviewUrl(null)
    }
  }

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('categories')

      setCategories(data)
    }

    loadCategories()
  }, [])

  return (
    <Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div>
          <Label>Preço</Label>
          <Input type="number" {...register('price')} />
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </div>

        <div>
          <LabelUpload>
            {imagePreviewUrl ? (
              <ImagePreview src={imagePreviewUrl} alt="Product" />
            ) : (
              <span>Upload da imagem</span>
            )}
            <input
              type="file"
              accept="image/png, image/jpg"
              {...register('file')}
              onChange={handleImageChange}
            />
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>
        </div>

        <div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={cat => cat.name}
                  placeholder="Categorias"
                />
              )
            }}
          ></Controller>
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
        </div>
        <FormButton type="submit">Adicionar produto</FormButton>
      </form>
    </Container>
  )
}

export default NewProduct
