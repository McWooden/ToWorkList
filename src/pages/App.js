import Navbar from '../component/Navbar/Navbar';
import { useState, createContext, useRef, useEffect } from 'react';
import { myAccount } from '../utils/dataJSON';
import { useSelector } from 'react-redux';
import TodoApp from '../component/TodoApp/TodoApp';

export const GuildContext = createContext()
export const ItemData = createContext()
export const PageContext = createContext()
export const AccountContext = createContext()
export const BookContext = createContext()
export const AppContext = createContext()
function App() {
  const mode = useSelector(state => state.source.mode)
  const navRef = useRef()
  const secondNavRef = useRef()
  const [hideNavbar, setHideNavbar] = useState(false)
  function handleNavbar(boolean) {
    setHideNavbar(!boolean)
  }
  useEffect(() => {
    if (mode === 'dark') {
      import('../styles/StyleComponent/dark.css')
    } else {
      import('../styles/StyleComponent/light.css')
    }
  }, [mode])
  useEffect(() => {
    let handler = (e) => {
        try {
            if (navRef.current.contains(e.target) || secondNavRef.current.contains(e.target)) {
              return
            } else {
              handleNavbar(false)
            }
        } catch (error) {
            
        }
    }
    document.addEventListener('mousedown', handler)
  })
  const [page, setPage] = useState(myAccount)
  function handleChangePage(newBook) {
    setPage(newBook)
  }
  
  return (
    <PageContext.Provider value={{
      page,
      pageType : page.profile.type,
      handleChangePage
    }}>
      <div id="app">
        <AppContext.Provider value={{
          secondNavRef,
          navRef,
          hideNavbar,
          handleNavbar,
        }}>
          <Navbar/>
          <TodoApp/>
        </AppContext.Provider>
      </div>
    </PageContext.Provider>
  )
}

export default App;
