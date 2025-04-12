import cl from '../styles/App.module.scss'
import { Button, ConfigProvider, Flex } from 'antd'
import { useResponsive } from 'antd-style'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import { logout, setUserData } from '../store/reducers/AuthSlice.ts'
import { userAPI } from '../services/userService.ts'
import { useAppDispatch, useAppSelector} from '../hooks/redux.ts'
import { skipToken } from '@reduxjs/toolkit/query'

const Header = () => {
    const { xxl } = useResponsive();

    const dispatch = useAppDispatch()

    const { token, username, image } = useAppSelector((state) => state.auth)
    const { data } = userAPI.useGetUserQuery(token ? token : skipToken)

    useEffect(() => {
        if(data) dispatch(setUserData(data.user))
    }, [data]);

    const onLogout = () => dispatch(logout())

    return(
        <header>
            <div className={cl.headerWrapper}>
                <Link to='/' className={cl.logo}>
                    Realworld Blog
                </Link>
                <div>
                    { username ?
                        <ConfigProvider componentSize={xxl ? 'large' : 'middle'} >
                            <Flex gap='large' style={{ display: 'flex', alignItems: 'center' }}>
                                <Link to="/">
                                    <Button variant='outlined' color='green'>Create article</Button>
                                </Link>
                                <Link to='/'>
                                    <div className={cl.profileWrapper}>
                                        <span className={cl.username}>{username}</span>
                                        <img src={image} alt='avatar'/>
                                    </div>
                                </Link>
                                <Link to='/' >
                                    <Button type='small' variant='outlined' color='default' onClick={onLogout}>
                                        Log Out
                                    </Button>
                                </Link>
                            </Flex>
                        </ConfigProvider>
                            :
                        <ConfigProvider componentSize={xxl ? 'large' : 'middle'}>
                            <Flex gap='large'>
                                <Link to="/sign-in" >
                                    <Button type='small'>Sign In</Button>
                                </Link>
                                <Link to='/sign-up'>
                                    <Button variant='outlined' color='green'>Sign Up</Button>
                                </Link>
                            </Flex>
                        </ConfigProvider>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header