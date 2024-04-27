import { DntViewPage, DntColumnsPage, MainPage, BgmPage } from "pages"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "components"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<MainPage />}></Route>
          <Route path='/viewdnt' element={<DntViewPage />} />
          <Route path='/dntcolumns' element={<DntColumnsPage />} />
          <Route path="/bgm" element={<BgmPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
