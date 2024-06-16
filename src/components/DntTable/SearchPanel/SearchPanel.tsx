import { ChangeEvent, FC, useCallback, useState } from "react"
import { Checkbox } from "ui/nextui-components"
import { useAppSelector } from "shared/hooks/useAppSelector"
import { Close } from "ui/icons"
import { useAppDispatch } from "shared/hooks/useAppDispatch"
import { setPanelSearchVariant, setPanelValue, togglePanelIsOpen } from "store/searchPanelSlice"
import debounce from "lodash/debounce"
import s from "./SearchPanel.module.scss"

interface SearchPanelI {}

export const SearchPanel: FC<SearchPanelI> = ({}) => {
  const [inputValue, setInputValue] = useState<string>("")
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state) => state.searchPanel.isOpen)
  const variant = useAppSelector((state) => state.searchPanel.searchVariant)
  const onClose = () => {
    dispatch(togglePanelIsOpen())
  }

  const onChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setPanelValue(e.target.value))
    }, 1000),
    [],
  )

  // For debouncing of dispatching value and displaying input value in real time.
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toLowerCase())
    onChange(e)
  }

  const onVariantChange = (variant: "equals" | "contains") => {
    dispatch(setPanelSearchVariant(variant))
  }

  if (isOpen) {
    return (
      <div className={s.searchPanelCnt}>
        <div className={s.searchPanel}>
          <div className={s.labelCloseCnt}>
            <label className={s.label}>Search by value</label>
            <Close height={16} width={16} className={s.icon} onClick={onClose} />
          </div>
          <input
            autoFocus
            spellCheck={false}
            value={inputValue}
            className={s.input}
            onChange={onInputChange}
            placeholder='What value you want to find?'
          />
          <div className={s.variantsCnt}>
            <label className={s.variantLabel}>Variant:</label>
            <div className={s.labelsCheckboxesCnt}>
              <div className={s.checkboxLabelCnt}>
                <label>Contains</label>
                <Checkbox isSelected={variant === "contains"} onChange={() => onVariantChange("contains")} />
              </div>
              <div className={s.checkboxLabelCnt}>
                <label>Equals</label>
                <Checkbox isSelected={variant === "equals"} onChange={() => onVariantChange("equals")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
