import cl from '../styles/Form.module.scss'
import { Button, Spin, Alert } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { articleAPI } from '../services/articleService.ts'
import { useParams } from 'react-router'

const schema = z.object({
    title: z.string().min(1, 'Title must be filled'),
    description: z.string().min(1, 'Description must be filled'),
    body: z.string().min(1, 'Article text must be filled'),
    tags: z.string().optional(),
})

type FormTypes = z.infer<typeof schema>

const EditArticle = () => {
    const { register, handleSubmit, setValue, formState: { errors }} = useForm<FormTypes>({
        resolver: zodResolver(schema),
    })

    const { slug } = useParams()
    const { data, isLoading, isError } = articleAPI.useGetArticleQuery(
        slug,
        { refetchOnMountOrArgChange: true }
    )

    const [ updateArticle ] = articleAPI.useUpdateArticleMutation()

    const navigate = useNavigate()
    const [inputText, setInputText] = useState<string>('')
    const [tagList, changeTagList] = useState<string[]>([])

    useEffect(() => {
        if (data?.article?.tagList) {
            changeTagList(data.article.tagList)
        }
    }, [data?.article?.tagList])

    useEffect(() => {
        setValue('tagsList', [...tagList].pop())
    }, [tagList])

    if(isLoading) return <Spin indicator={<LoadingOutlined spin />} size='large' />
    if(isError) return <Alert message='Network Error' type='error' showIcon />

    if (!data) return null

    const { title, body, description } = data.article

    const onSubmit = async (formData: FormTypes) => {
        const article = {
            article: { ...formData, tagList}
        }

        try {
            await updateArticle({article, slug}).unwrap()
            navigate('/')
        }
        catch (error) {
            console.error(error)
        }
    }

    const updateTag = (index: number, newValue: string) => {
        changeTagList(prev => {
            const updated = [...prev]
            updated[index] = newValue
            return updated
        })
    }

    const addTag = () => {
        const tag = inputText.trim()

        if(tag) {
            changeTagList(prev => [...prev, tag])
            setInputText('')
        }
    }

    const deleteTag = (tagToRemove: string) => {
        changeTagList(prev => prev.filter(value => value !== tagToRemove))
    }


        return(
            <div className={cl.formContainer} style={{ width: 938, marginTop: 0 }}>
                <h3 className={cl.title}>Edit article</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className={cl.formItem}>
                        <label className={cl.label}>Title</label>
                        <input
                            type='text'
                            placeholder='Title'
                            defaultValue={title}
                            className={`${cl.input} ${errors.title ? cl.inputError : ''}`}
                            {...register('title')}
                        />
                        { errors.title && <p className={cl.error}>{errors.title.message}</p> }
                    </div>

                    <div className={cl.formItem}>
                        <label className={cl.label}>Short description</label>
                        <input
                            type='text'
                            placeholder='Description'
                            defaultValue={description}
                            className={`${cl.input} ${errors.description ? cl.inputError : ''}`}
                            {...register('description')}
                        />
                        { errors.description && <p className={cl.error}>{errors.description.message}</p> }
                    </div>

                    <div className={cl.formItem}>
                        <label className={cl.label}>Text</label>
                        <textarea
                            placeholder='Text'
                            defaultValue={body}
                            className={`${cl.input} ${errors.body ? cl.inputError : ''}`}
                            style={{ height: 168, fontSize: 16 }}
                            {...register('body')}
                        />
                        { errors.body && <p className={cl.error}>{errors.body.message}</p> }
                    </div>

                    <div className={cl.formItem}>
                        <label className={cl.label}>Tags</label>
                        <ul>
                            {tagList.map((tag, idx) => {
                                return(
                                    <li key={idx+tag}>
                                        <input type='text'
                                               placeholder='Tag'
                                               className={cl.input}
                                               style={{ width: 300, marginBottom: 5 }}
                                               defaultValue={tag}
                                               onChange={(e) => updateTag(idx, e.target.value)}
                                        />
                                        <Button
                                            color='danger'
                                            variant='outlined'
                                            className={cl.tagBtn}
                                            onClick={() => deleteTag(tag)}
                                        >
                                            Delete
                                        </Button>
                                    </li>
                                )
                            })}
                            <li>
                                <input
                                    type='text'
                                    placeholder='Tag'
                                    className={cl.input}
                                    style={{ width: 300 }}
                                    onChange={(e) => setInputText(e.target.value)}
                                    value={inputText} />
                                <Button color='primary' variant='outlined' onClick={addTag} className={cl.tagBtn}>
                                    Add tag
                                </Button>
                            </li>
                        </ul>
                    </div>

                    <div className={cl.formItem} style={{ marginBottom: 0, width: 319 }}>
                        <button type='submit' className={cl.submitButton}>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        )
}

export default EditArticle