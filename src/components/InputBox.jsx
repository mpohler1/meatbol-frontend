import React, {Component} from 'react';
import {connect} from "react-redux";
import {inputTextChange, setShiftHeld} from "../actions/actions";

class InputBox extends Component {

    handleInputTextChange(event) {
        this.props.inputTextChange(
            event.target.value,
            event.target.selectionStart,
            event.target.selectionEnd
        );
    }

    handleKeyDown(event) {
        switch (event.keyCode) {
            case 9:
                event.preventDefault();
                if (this.props.shiftHeld) {
                    // this.performShiftTab(input, start, end);
                }
                else if (this.props.selectionEnd - this.props.selectionStart > 1) {
                    // selection tab
                } else {
                    this.performSingleTab(event);
                }
                break;

            case 16:
                this.props.setShiftHeld(true);
                break;

            default:
                break;
        }
    }

    handleKeyUp(event) {
        if (event.keyCode === 16) {
            this.props.setShiftHeld(false);
        }
    }

    componentDidUpdate = () => {
        // // This is to determine the selection after selectionTab and shiftTab actions
        // // JSX TextAreas do not have selectionStart and selectionEnd as properties
        // let inputBoxTextArea = document.getElementById("inputBoxTextArea");
        // inputBoxTextArea.setSelectionRange(this.props.selectionStart, this.props.selectionEnd);
    };

    render() {
        return (
            <div className="form-group">
                <label htmlFor="inputBoxTextArea">Meatbol Code</label>
                <textarea className="form-control text-monospace overflow-auto"
                          id={"inputBoxTextArea" /* needs to be stored in state if multiple of these */}
                          rows="32"
                          cols="80"
                          value={this.props.input}
                          onKeyDown={(event) => this.handleKeyDown(event)}
                          onKeyUp={(event) => this.handleKeyUp(event)}
                          onChange={(event) => this.handleInputTextChange(event)}>
                </textarea>
            </div>
        );
    }

    performSingleTab(event) {
        let input = event.target.value;
        let selectionStart = event.target.selectionStart;
        let selectionEnd = event.target.selectionEnd;

        input = input.substring(0, selectionStart) + "\t" + input.substring(selectionEnd, input.length);
        this.props.inputTextChange(
            input,
            selectionStart+1,
            selectionEnd+1
        );
    }
}

const mapStateToProps = state => {
    return {
        input: state.inputBox.input,
        shiftHeld: state.inputBox.shiftHeld,
        selectionStart: state.inputBox.selectionStart,
        selectionEnd: state.inputBox.selectionEnd
    };
};

export default connect(mapStateToProps, {
    inputTextChange,
    setShiftHeld
})(InputBox);
