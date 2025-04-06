import cl from '../styles/SignUp.module.scss'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

type FieldType = {
    username: string
    email: string
    password: string
    confirmPassword: string
    personalInfo: boolean
}

const SignIn = () => {
    const { register, handleSubmit, watch, formState: { errors }} = useForm<FieldType>({
        defaultValues: {
            personalInfo: true
        }
    })

    const onSubmit: SubmitHandler<FieldType> = (data) => {

        console.log(data)
    }

    const password = watch('password')

    return (
        <div className={cl.signupContainer}>
            <h3 className={cl.title}>Sign In</h3>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className={cl.formItem}>
                    <label className={cl.label}>Email address</label>
                    <input
                        type="email"
                        placeholder="Email address"
                        className={`${cl.input} ${errors.email ? cl.inputError : ''}`}
                        {...register('email', {
                            required: 'Please input your email',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'The input is not a valid email'
                            }
                        })}
                    />
                    {errors.email && <p className={cl.error}>{errors.email.message}</p>}
                </div>

                <div className={cl.formItem}>
                    <label className={cl.label}>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className={`${cl.input} ${errors.password ? cl.inputError : ''}`}
                        {...register('password', {
                            required: 'Please input your password',
                            pattern: {
                                value: /^.{3,20}$/,
                                message: 'Password needs to be from 6 to 40 characters'
                            }
                        })}
                    />
                    {errors.password && <p className={cl.error}>{errors.password.message}</p>}
                </div>

                <div className={cl.formItem}>
                    <button type="submit" className={cl.submitButton}>
                        Login
                    </button>
                </div>
            </form>

            <div className={cl.haveAccount}>
                Already have an account? <Link to="/sign-in">Sign Up</Link>
            </div>
        </div>
    )
}

export default SignIn
