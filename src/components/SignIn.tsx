import cl from '../styles/Form.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useAppDispatch } from '../hooks/redux.ts'
import { userAPI } from '../services/userService.ts'
import { loginSuccess } from '../store/reducers/AuthSlice.ts'

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(40),
})

type FormTypes = z.infer<typeof schema>;

const SignIn = () => {
    const { register, handleSubmit, setError, formState: { errors }} = useForm<FormTypes>({
        defaultValues: {
            personalInfo: true
        },
        resolver: zodResolver(schema),
    })

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const [ loginUser ] = userAPI.useLoginUserMutation()

    const onLogin = async (formData: FormTypes) => {
        try {
            const response = await loginUser({user: {...formData}}).unwrap()
            dispatch(loginSuccess(response.user))
            navigate('/')
        }
        catch (error) {
            if(error.status === 422) {
                setError('email', {
                    type: 'server',
                    message: `Email or password ${error.data.errors['email or password']}`,
                });
                setError('password', {
                    type: 'server',
                    message: `Email or password ${error.data.errors['email or password']}`,
                });
            }
        }
    }

    return (
        <div className={cl.signupContainer}>
            <h3 className={cl.title}>Sign In</h3>

            <form onSubmit={handleSubmit(onLogin)}>

                <div className={cl.formItem}>
                    <label className={cl.label}>Email address</label>
                    <input
                        type='email'
                        placeholder='Email address'
                        className={`${cl.input} ${errors.email ? cl.inputError : ''}`}
                        {...register('email')}
                    />
                    { errors.email && <p className={cl.error}>{errors.email.message}</p> }
                </div>

                <div className={cl.formItem}>
                    <label className={cl.label}>Password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        className={`${cl.input} ${errors.password ? cl.inputError : ''}`}
                        {...register('password')}
                    />
                    {errors.password && <p className={cl.error}>{errors.password.message}</p>}
                </div>

                <div className={cl.formItem}>
                    <button type='submit' className={cl.submitButton}>
                        Login
                    </button>
                </div>
            </form>

            <div className={cl.haveAccount}>
                Already have an account? <Link to='/sign-up'>Sign Up</Link>
            </div>
        </div>
    )
}

export default SignIn
