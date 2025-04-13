import cl from '../styles/Form.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from 'antd'

const schema = z.object({
    title: z.string(),
    description: z.string(),
    text: z.string(),
    tag: z.string(),
})

type FormTypes = z.infer<typeof schema>;

const CreateArticle = () => {
    const { register, handleSubmit, formState: { errors }} = useForm<FormTypes>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (formData: FormTypes) => {
        console.log(formData)
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
                    <input
                        type='text'
                        placeholder='Tag'
                        className={`${cl.input} ${errors.tag ? cl.inputError : ''}`}
                        style={{ width: 300 }}
                        {...register('tag')}
                    />
                    <Button color='danger' variant='outlined' style={{ height: 40, marginLeft: 18, width: 120, fontSize: 16 }}>
                        Delete
                    </Button>
                    <Button color='primary' variant='outlined' style={{ height: 40, marginLeft: 18, width: 136, fontSize: 16 }}>
                        Add tag
                    </Button>
                    { errors.tag && <p className={cl.error}>{errors.tag.message}</p> }
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