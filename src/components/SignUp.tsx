import cl from '../styles/SignUp.module.scss'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { userAPI } from '../services/userService.ts'
import {IUser} from "../models/IUser.ts";

type FieldType = {
    username: string
    email: string
    password: string
    confirmPassword: string
    personalInfo: boolean
}

const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors }} = useForm<FieldType>({
        defaultValues: {
            personalInfo: true
        }
    })

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjI5ODI0YzVjZDM2MWIwMDkxMDQwNCIsInVzZXJuYW1lIjoiZ2hnaGdoZyIsImV4cCI6MTc0OTEzNTkwOCwiaWF0IjoxNzQzOTUxOTA4fQ.mdCCRpEO_ICy6OBZFhgVXd2htnSwqauqP_oIFpZ_sQU'

    const [ createUser, {} ] = userAPI.useCreateUserMutation()

    const onSubmit: SubmitHandler<FieldType> = async ({ username, password, email }) => {
        const response = await createUser({
            user: { username, password, email }
        })
    }

    const password = watch('password')

    return (
        <div className={cl.signupContainer}>
            <h3 className={cl.title}>Create new account</h3>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className={cl.formItem}>
                    <label className={cl.label}>Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        className={`${cl.input} ${errors.username ? cl.inputError : ''}`}
                        {...register('username', {
                            required: 'Please input your username',
                            pattern: {
                                value: /^.{3,20}$/,
                                message: 'Username needs to be from 3 to 20 characters'
                            }
                        })}
                    />
                    {errors.username && <p className={cl.error}>{errors.username.message}</p>}
                </div>

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
                    <label className={cl.label}>Repeat Password</label>
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        className={`${cl.input} ${errors.confirmPassword ? cl.inputError : ''}`}
                        {...register('confirmPassword', {
                            required: 'Repeating password is required',
                            validate: (value) => value === password || 'Password must match'
                        })}
                    />
                    {errors.confirmPassword && (
                        <p className={cl.error}>{errors.confirmPassword.message}</p>
                    )}
                </div>

                <div className={cl.formItem} style={{ borderTop: '1px solid #E8E8E8', paddingTop: 12 }}>
                    <label className={cl.checkboxLabel}>
                        <input
                            type="checkbox"
                            {...register('personalInfo', {
                                required: 'You should accept the rules'
                            })}
                        />
                        <span style={{ marginLeft: 8 }}>
                            I agree to the processing of my personal information
                        </span>
                    </label>
                    {errors.personalInfo && <p className={cl.error}>{errors.personalInfo.message}</p>}
                </div>

                <div className={cl.formItem}>
                    <button type="submit" className={cl.submitButton}>
                        Create
                    </button>
                </div>
            </form>

            <div className={cl.haveAccount}>
                Already have an account? <Link to="/sign-in">Sign In</Link>
            </div>
        </div>
    )
}

export default SignUp
