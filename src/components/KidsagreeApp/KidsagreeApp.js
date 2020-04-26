/* @flow */
import type { Node } from 'react'
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { BaseStyles, theme } from '../..'
import { styledPublicUrl as asset } from '../../public-url'
import logo from './assets/logo-background.svg'

// KidsagreeApp provides everything needed to start an Kidsagree App.

const StyledKidsagreeApp = styled.main`
  min-width: 320px;
  min-height: 100vh;
  background-color: ${theme.mainBackground};
  background-image: ${({ backgroundLogo }) =>
    backgroundLogo ? css`url(${asset(logo)})` : 'none'};
  background-position: 50% 50%;
  background-repeat: no-repeat;
`

type Props = {
  className: string,
  backgroundLogo: boolean,
  publicUrl: string,
  children: Node,
}

class KidsagreeApp extends React.Component<Props> {
  static defaultProps = {
    backgroundLogo: false,
  }
  static childContextTypes = {
    publicUrl: PropTypes.string,
  }
  static Styled = StyledKidsagreeApp

  getChildContext() {
    return { publicUrl: this.props.publicUrl }
  }

  render() {
    const { children, backgroundLogo, className, publicUrl } = this.props
    const styledProps = { backgroundLogo, className, publicUrl }
    return (
      <StyledKidsagreeApp {...styledProps}>
        <BaseStyles />
        {children}
      </StyledKidsagreeApp>
    )
  }
}

export default KidsagreeApp
