import { Layout } from 'antd'
const { Header, Footer } = Layout

import './index.scss'

const App = props => {
  return (
    <div>
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        {props.children}
        <Footer style={{ textAlign: 'center' }}>initial by jin</Footer>
      </Layout>
    </div>
  )
}

export default App
