import cl from '../styles/App.module.scss'
import { Button, ConfigProvider, Flex } from 'antd'
import { useResponsive } from 'antd-style'
import { Link } from 'react-router-dom'

const Header = () => {
    const { xxl } = useResponsive();

    return(
        <header>
            <div className={cl.headerWrapper}>
                <Link to='/' className={cl.logo}>
                    Realworld Blog
                </Link>
                <div>
                    <ConfigProvider componentSize={xxl ? 'large' : 'middle'}>
                        <Flex gap='large'>
                            <Button type='small'>Sign In</Button>
                            <Button variant='outlined' color='green'>Sign Up</Button>
                        </Flex>
                    </ConfigProvider>
                </div>
            </div>
        </header>
    )
}

export default Header