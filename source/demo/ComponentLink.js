import React from 'react'
import cn from 'classnames'
import styles from './ComponentLink.css'

export default function ComponentLink ({ activeComponent, component, setActiveComponent }) {
  const classNames = cn(styles.ComponentLink, {
    [styles.ActiveComponentLink]: activeComponent === component
  })

  return (
    <a
      className={classNames}
      onClick={(event) => {
        event.preventDefault()
        setActiveComponent(component)
      }}
      href={`/?component=${component}`}
    >
      {component}
    </a>
  )
}
