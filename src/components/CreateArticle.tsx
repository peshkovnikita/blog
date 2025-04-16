import cl from '../styles/Form.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from 'antd'
import { ChangeEvent, useState, useEffect } from 'react'

const schema = z.object({
    title: z.string().min(1, 'Title must be filled'),
    description: z.string().min(1, 'Description must be filled'),
    text: z.string().min(1, 'Article text must be filled'),
    tags: z.string(),
})

type FormTypes = z.infer<typeof schema>

const CreateArticle = () => {
    const { register, handleSubmit, setValue, formState: { errors }} = useForm<FormTypes>({
        resolver: zodResolver(schema),
    })

    const [inputText, setInputText] = useState<string>('')
    const [tagList, changeTagList] = useState<string[]>([])

    const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
    }

    useEffect(() => {
        setValue('tags', [...tagList].pop())
    }, [tagList])

    const onSubmit = (formData: Omit<FormTypes, 'tags'>) => {
        const fullData = {
            ...formData,
            tags: tagList
        }
        console.log(fullData)
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

    return (
        <div className={cl.formContainer} style={{ width: 938 }}>
            <h3 className={cl.title}>Create new article</h3>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className={cl.formItem}>
                    <label className={cl.label}>Title</label>
                    <input
                        type='text'
                        placeholder='Title'
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
                        className={`${cl.input} ${errors.description ? cl.inputError : ''}`}
                        {...register('description')}
                    />
                    { errors.description && <p className={cl.error}>{errors.description.message}</p> }
                </div>

                <div className={cl.formItem}>
                    <label className={cl.label}>Text</label>
                    <textarea
                        placeholder='Text'
                        className={`${cl.input} ${errors.text ? cl.inputError : ''}`}
                        style={{ height: 168, fontSize: 16 }}
                        {...register('text')}
                    />
                    { errors.text && <p className={cl.error}>{errors.text.message}</p> }
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
                                           readOnly
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
                            <input type='text' placeholder='Tag' className={cl.input} style={{ width: 300 }} onChange={onTextChange} value={inputText} />
                            {/*<Button color='danger' variant='outlined' className={cl.tagBtn} disabled={!tagList.length}>*/}
                            {/*    Delete*/}
                            {/*</Button>*/}
                            <Button color='primary' variant='outlined' onClick={addTag} className={cl.tagBtn}>
                                Add tag
                            </Button>
                        </li>
                    </ul>
                </div>

                <div className={cl.formItem} style={{ marginBottom: 0, width: 319 }}>
                    <button type='submit' className={cl.submitButton}>
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateArticle