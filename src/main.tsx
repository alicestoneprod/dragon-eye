import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"
import { store } from "store"
import { FirebaseProvider } from "./FirebaseProvider.tsx"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <NextUIProvider>
      <main className='dark text-foreground bg-background'>
        <FirebaseProvider>
          <App />
        </FirebaseProvider>
      </main>
    </NextUIProvider>
  </Provider>,
)
