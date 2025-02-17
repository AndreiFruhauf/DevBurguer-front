import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
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
  ImagePreview,
  ContainerInput
} from './styles'

function EditProduct() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [categories, setCategories] = useState()
  const navigate = useNavigate()

  const {
    state: { product }
  } = useLocation()
  console.log('Produto selecionado:', product)

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o Nome do produto'),
    price: Yup.string().required('Digite o Preço do produto'),
    category: Yup.object().required('Escolha uma Categoria'),
    offer: Yup.bool()
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
    productDataFormData.append('offer', data.offer)

    await toast.promise(
      api.put(`products/${product.id}`, productDataFormData),
      {
        pending: 'Editando novo produto',
        success: 'Produto editado com sucesso',
        error: 'Falha ao editar o produto'
      }
    )

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
          <Input
            type="text"
            {...register('name')}
            defaultValue={product.name}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </div>

        <div>
          <Label>Preço</Label>
          <Input
            type="number"
            {...register('price')}
            defaultValue={product.price}
          />
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
            defaultValue={product.category}
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={cat => cat.name}
                  placeholder="Categorias"
                  defaultValue={product.category}
                />
              )
            }}
          ></Controller>
          <ErrorMessage>{errors.category?.message}</ErrorMessage>
          <ContainerInput>
            <input
              type="checkbox"
              {...register('offer')}
              defaultChecked={product.offer}
            />
            <Label>Produto em oferta?</Label>
          </ContainerInput>
        </div>
        <FormButton type="submit">Editar produto</FormButton>
      </form>
    </Container>
  )
}

export default EditProduct
