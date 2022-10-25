import React, { Component } from 'react';
import { connect } from 'react-redux';


class ReadingStrip extends Component {
    state = {  } 

    render() { 
        return (
            <div className={`ReadingStrip${this.props.id}`} style={this.getstyles("border")}>
                <div style={this.getstyles("strip")}></div>
            </div>
        );
    }
    getstyles = (type) => {
        let style;
        if (type === "border")
        {
            style = {
                width: "100%",
                height: "1rem + 3px",
                border: "3px solid white",
                borderRadius: "0.5rem",
            }
        }
        else if (type === "strip")
        {
            style = {
                width: this.props.readingstrip[this.props.id - 1] + "%",
                height: "1rem",
                backgroundColor: "lightskyblue",
                borderRadius: "0.3rem"
            }
        }
        return style;
    }
}

const mapStateToProps = (state, props) => {
    // console.log(state.readingstrip)
    return {
        readingstrip: state.readingstrip,
    }
}


export default connect(mapStateToProps, null)(ReadingStrip);