import { FC } from "react"
import { Avatar } from "@nextui-org/react"
import Github from "ui/icons/github.svg?react"
import Logo from "ui/icons/eye.svg?react"
import s from "./Main.module.scss"
import { NavLink } from "react-router-dom"

interface MainI {}

export const Main: FC<MainI> = ({}) => {
  return (
    <div className={s.mainCnt}>
      <div className={s.title}>
        <h1>About website & developer</h1>
      </div>
      <div className={s.mainDescriptionCnt}>
        <div className={s.aboutApp}>
          <p className='flex items-center'>
            <Logo width={64} height={64} className='mr-5' />
            <span className={s.appName}>Dragon Eye</span>- opensource webapp for view content of DNT Files. You also can explore column names of DNT.
          </p>
        </div>
        <div className={s.aboutDev}>
          <h1 className={s.aboutTitle}>Developer: </h1>
          <Avatar src='https://avatars.githubusercontent.com/u/126640746?v=4' className='w-40 h-40' />
          <div className={s.devDesc}>
            <p>
              <br />
              Alice Morozova (she/her)
              <br /> 19 years old, React Frontend Developer. (Russia, Moscow) <br />
              True fan of Dragon Nest game.
              <br />
              Im not a designer, Im just a form creator.
              <span className='flex justify-center py-3'>
                <NavLink target='_blank' to='https://github.com/alicestoneprod'>
                  <Github className='cursor-pointer' />
                </NavLink>
              </span>
            </p>
          </div>
        </div>
        <div className={s.futureSection}>
          <h1 className={s.futureTitle}>In future:</h1>
          <ul>
            <li>— Feature of converting CSV file to .DNT</li>
            <li>— Able to listen BGM Music</li>
            <li>— Melon Gallery (if you know what is it)</li>
            <li>— Internationalisation</li>
          </ul>
        </div>
      </div>
      <div className={s.imgCnt}>
        <img src='/assets/sorceress/black_mara.png' width={500} height={400} />
      </div>
      <div className={s.imgCnt3}>
        <img src='/assets/archer/silver_hunter.png' width={500} height={0} />
      </div>
    </div>
  )
}
