import { FC, ReactNode, createContext } from "react"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "shared/constants"

interface FirebaseProviderI {
  children: ReactNode
}

const app = initializeApp(firebaseConfig)

export const AppContext = createContext(app)

export const FirebaseProvider: FC<FirebaseProviderI> = ({ children }) => {
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>
}
