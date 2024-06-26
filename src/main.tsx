import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"
import { store } from "store"
import { SupabaseProvider } from "./providers/SupabaseProvider"
import { Toaster } from "react-hot-toast"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <NextUIProvider>
      <main className='dark text-foreground bg-background'>
        <SupabaseProvider>
          <Toaster position='top-right' />
          <App />
        </SupabaseProvider>
      </main>
    </NextUIProvider>
  </Provider>,
)
