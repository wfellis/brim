import React from "react"
import DownArrow from "../icons/chevron-bottom-md.svg"
import {ContextMenu, MenuItem} from "./ContextMenu"

export default class LogCell extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {showMenu: false}
    this.include = this.include.bind(this)
    this.exclude = this.exclude.bind(this)
    this.countBy = this.countBy.bind(this)
    this.toggleMenu = () => this.setState({showMenu: !this.state.showMenu})
  }

  include(_e) {
    this.props.appendQueryInclude(this.props.name, this.props.value)
    this.props.fetchMainSearch()
  }

  exclude(_e) {
    this.props.appendQueryExclude(this.props.name, this.props.value)
    this.props.fetchMainSearch()
  }

  countBy() {
    this.props.appendQueryCountBy(this.props.name)
    this.props.fetchMainSearch()
  }

  render() {
    const {name, type, value, appendQueryInclude} = this.props
    let cellClass = `log-cell ${type}`
    if (this.state.showMenu) cellClass += " active"

    let valueClass = ""

    if (name === "_path") {
      valueClass += ` ${name} ${value}-bg-color`
    }

    return (
      <div className={cellClass}>
        <span className={valueClass}>{value}</span>
        <span className="field-name">{name}</span>
        <button className="cell-options-button" onClick={this.toggleMenu}>
          <DownArrow />
        </button>
        {this.state.showMenu && (
          <ContextMenu onOutsideClick={this.toggleMenu}>
            <MenuItem onClick={this.exclude}>Filter out these values</MenuItem>
            <MenuItem onClick={() => appendQueryInclude(name, value)}>
              Only show these values
            </MenuItem>
            <MenuItem onClick={this.countBy}>Count by this field</MenuItem>
          </ContextMenu>
        )}
      </div>
    )
  }
}

export const TsCell = ({ts, highlight, onClick}) => {
  return (
    <div
      className={`ts-cell ${highlight ? "highlight" : ""}`}
      onClick={onClick}
    >
      <p>
        <span className="date">{ts.format("MMM DD, YYYY")}</span>
        <span className="time">{ts.format("HH:mm")}</span>
        <span className="seconds">{ts.format("ss.SSSS[s]")}</span>
      </p>
    </div>
  )
}