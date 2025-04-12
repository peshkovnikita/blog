import { ConfigProvider, Pagination } from 'antd'
import type { PaginationProps } from 'antd'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import { setCurrentPage } from '../store/reducers/ArticleSlice.ts'
import { useNavigate } from 'react-router-dom'

const paginationStyles = {
    token: {
        colorPrimary: '#FFFFFF'
    },
    components: {
        Pagination: {
            itemActiveBg: '#1890FF',
            itemActiveColor: '#FFFFFF',
            itemBg: 'transparent',
            itemColor: '#262626',
        }
    }
}

const Footer = () => {
    const dispatch = useAppDispatch()
    const { currentPage, articlesCount } = useAppSelector((state) => state.page)

    const navigate = useNavigate()

    const onChange: PaginationProps['onChange'] = (page) => {
        dispatch(setCurrentPage(page))
        navigate(`/articles/${page}`)
    }

    return(
        <>
            <ConfigProvider theme={paginationStyles}>
                <Pagination
                    align='center'
                    defaultPageSize={5}
                    current={currentPage}
                    total={articlesCount}
                    onChange={onChange}
                    showSizeChanger={false}
                    style={{marginBottom: 24}}
                />
            </ConfigProvider>
        </>
    )
}

export default Footer