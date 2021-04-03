import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import {
    ClickAwayListener, ExpandMoreIcon, Fade, FormControl,
    IconButton, Input, InputAdornment, InputLabel,
    MenuItem,
    MenuList,
    MoreVertIcon,
    Paper,
    Popper
} from "./ui-component";
import {DesignProps, TRDropdownData} from "./tr-ui-data";
import TRStyleHelper from "../src/tr-style-helper";



class TRSelectState implements TRState {
    public anchorRef: any = React.createRef();
    public open: boolean = false;
}

export enum PopperPlacementType {
    BOTTOM_END = 'bottom-end',
    BOTTOM_START = 'bottom-start',
    BOTTOM = 'bottom',
    LEFT_END = 'left-end',
    LEFT_START = 'left-start',
    LEFT = 'left',
    RIGHT_END = 'right-end',
    RIGHT_START = 'right-start',
    RIGHT = 'right',
    TOP_END = 'top-end',
    TOP_START = 'top-start',
    TOP = 'top'
}


export interface DropdownStyle {
    actionButton?: DesignProps;
    paper?: DesignProps;
    menuList?: DesignProps;
    menuItem?: DesignProps;
}

class TRSelectProps implements TRProps {
    public actions: Array<TRDropdownData> = [];
    public dropdownStyle?: DropdownStyle;
    public popperPlacementType?: PopperPlacementType = PopperPlacementType.BOTTOM_END;
    public fadeTimeout?: number = 350;
    public clickIcon?: any;
}

export default class TRSelect extends TRReactComponent<TRSelectProps, TRSelectState> {

    static defaultProps = {
        popperPlacementType: PopperPlacementType.BOTTOM_END,
        fadeTimeout: 350,
        clickIcon: MoreVertIcon
    };

    state: TRSelectState = new TRSelectState();

    handleClick = (event: any) => {
        this.setState({anchorRef: event.currentTarget});
        this.setState((state: any) => {
            return {open: !state.open};
        });
    };

    handleClose = (event: any) => {
        if (this.state.anchorRef && this.state.anchorRef.current && this.state.anchorRef.current.contains(event.target)) {
            return;
        }
        this.setState({open: false});
    };



    render() {
        const defStyle: TRStyleHelper = new TRStyleHelper(this.props, "dropdownStyle");
        const {popperPlacementType, fadeTimeout, clickIcon} = this.props;
        const ClickIcon = clickIcon;
        return (<React.Fragment>
            <FormControl >
                <InputLabel >ABC</InputLabel>
                <Input
                    id="adornment-password"
                    type="text"
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                ref={this.state.anchorRef}
                                onClick={(event: any) => {this.handleClick(event)}}
                            >
                                <ExpandMoreIcon/>
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>


            <Popper open={this.state.open} anchorEl={this.state.anchorRef} placement={popperPlacementType} transition >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={fadeTimeout}>
                        <Paper
                            classes={ defStyle.classes("paper")}
                            className={defStyle.className("paper")}
                            style={defStyle.style("paper")}
                            id="menu-list-grow">
                            <ClickAwayListener onClickAway={(event: any) => { this.handleClose(event)}}>
                                <MenuList
                                    classes={ defStyle.classes("menuList")}
                                    className={defStyle.className("menuList")}
                                    style={defStyle.style("menuList")}>
                                    {
                                        this.props.actions.map((definition: TRDropdownData, key: any) => {
                                            return (
                                                <MenuItem
                                                    classes={ defStyle.classes("menuItem")}
                                                    className={defStyle.className("menuItem")}
                                                    style={defStyle.style("menuItem")}
                                                    key={key} onClick={event => {
                                                    if (definition.onClickFunction && definition.onClickFunction.click) {
                                                        definition.onClickFunction.click(event, definition.onClickCallbackData);
                                                    }
                                                    this.handleClose(event)
                                                }}>
                                                    {definition.itemContent}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </React.Fragment>);
    }
}