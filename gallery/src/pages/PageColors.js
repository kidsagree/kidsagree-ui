import React from 'react'
import styled from 'styled-components'
import { colors, brand } from '@kidsagree/ui'
import Page from 'comps/Page/Page'
import ColorGroup from 'comps/ColorGroup/ColorGroup'

const PageButton = ({ title }) => (
  <Page title={title}>
    <p>The Kidsagree color palettes.</p>
    <div>
      <h2>Kidsagree Colors</h2>
      <p>
        These palettes contain the colors used by Kidsagree. It is not recommended
        to refer to them in your Kidsagree apps, prefer using the Kidsagree UI Theme.
      </p>
      {Object.entries(colors).map(([name, colors]) => (
        <ColorGroup
          key={name}
          name={name}
          colors={colors}
          title={<h3>{name}</h3>}
          compact
        />
      ))}
    </div>
    <ColorGroup
      title={
        <div>
          <h2>Kidsagree Brand</h2>
          <p>
            This palette contains the base colors that define the Kidsagree brand.
          </p>
        </div>
      }
      colors={brand}
      compact
    />
  </Page>
)

export default PageButton
