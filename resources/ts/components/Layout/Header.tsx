import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Theme, Menu, MenuItem, ListItemText, ListItemIcon, SvgIconTypeMap } from "@material-ui/core";
import { USER_TOKEN_KEY, APP_URL } from "../../config";
import { withStyles } from "@material-ui/styles";
import LanguageIcon from "@material-ui/icons/Language";
import PublicIcon from "@material-ui/icons/Public";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";
import BusinessIcon from "@material-ui/icons/Business";
import CategoryIcon from "@material-ui/icons/Category";
import Email from "@material-ui/icons/Email";
import StoreIcon from "@material-ui/icons/Store";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ViewListIcon from "@material-ui/icons/ViewList";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { RouteComponentProps, withRouter } from 'react-router';
import { AppState } from "../../rootReducer";
import { connect } from "react-redux";
import { CoreState } from "../../store/Core/types";
import { ThunkDispatch } from "redux-thunk";
import { coreFetchUser } from "../../store/Core/actions";

const styler = withStyles((theme: Theme) => ({
    appBar: {
        background: theme.palette.common.white,
        color: theme.palette.primary.main,
        paddingBottom: 0
    },
    grow: {
        flexGrow: 1
    },
    icon: {
        marginLeft: 8,
        marginRight: 4
    },
    brandName: {
        display: "inline",
        borderBottom: "solid 2px " + theme.palette.primary.main
    },
    link: {
        fontWeight: 600,
        color: theme.palette.grey[600]
    },
    active: {
        color: theme.palette.primary.main + "!important",
        fontWeight: 600,
    }
}))

const mapStateToProps = (state: AppState) => ({
    ...state.core
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onLoad: () => dispatch(coreFetchUser())
});

export interface HeaderProps extends CoreState {
    classes: {
        appBar: string;
        grow: string;
        icon: string;
        brandName: string;
        link: string;
        active: string;
    },
    onLoad: () => void;
}

interface HeaderState {
    width: number;
    more: boolean;
}

interface HeaderLink {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    label: string;
    name: string;
    type: number;
    onClick?: () => void;
}

const links: HeaderLink[] = [
    {
        Icon: LanguageIcon,
        label: "Province",
        name: "province",
        type: 1
    },
    {
        Icon: PublicIcon,
        label: "District",
        name: "district",
        type: 1
    },
    {
        Icon: NaturePeopleIcon,
        label: "City",
        name: "city",
        type: 1
    },
    {
        Icon: BusinessIcon,
        label: "Pharma",
        name: "supplier",
        type: 1
    },
    {
        Icon: CategoryIcon,
        label: "Product Category",
        name: "productCategory",
        type: 1
    },
    {
        Icon: StoreIcon,
        label: "Chemist",
        name: "shop",
        type: 1
    },
    {
        Icon: StoreIcon,
        label: "View Chemist",
        name: "shop-view",
        type: 1
    },
    {
        Icon: ViewListIcon,
        label: "View Order",
        name: "order",
        type: 1
    },
    {
        Icon: PowerSettingsNewIcon,
        label: "Logout",
        name: "logout",
        type: 1,
        onClick: () => {
            localStorage.removeItem(USER_TOKEN_KEY);
            window.location.href = (APP_URL as string);
        }
    }
];

const links2: HeaderLink[] = [
    {
        Icon: CategoryIcon,
        label: "Product",
        name: "add-product",
        type: 3
    },
    {
        Icon: Email,
        label: "Email List",
        name: "email-list",
        type: 3
    },
    {
        Icon: ViewListIcon,
        label: "Orders",
        name: "order",
        type: 3
    },
    {
        Icon: PowerSettingsNewIcon,
        label: "Logout",
        name: "logout",
        type: 1,
        onClick: () => {
            localStorage.removeItem(USER_TOKEN_KEY);
            window.location.href = (APP_URL as string);
        }
    }
];

const links3: HeaderLink[] = [
    {
        Icon: ViewListIcon,
        label: "Place Order",
        name: "place-order",
        type: 2
    },
    {
        Icon: ViewListIcon,
        label: "View Order",
        name: "order",
        type: 1
    },
    {
        Icon: PowerSettingsNewIcon,
        label: "Logout",
        name: "logout",
        type: 1,
        onClick: () => {
            localStorage.removeItem(USER_TOKEN_KEY);
            window.location.href = (APP_URL as string);
        }
    }
];

class Header extends React.Component<HeaderProps & RouteComponentProps<{}>, HeaderState> {

    constructor(props: HeaderProps & RouteComponentProps<{}>) {
        super(props);

        this.state = {
            width: window.innerWidth,
            more: false
        }

        window.addEventListener("resize", () => {
            this.setState({ width: window.innerWidth });
        })
    }

    componentDidMount() {
        this.props.onLoad();
    }

    public render() {
        const { classes, user } = this.props;
        const { width, more } = this.state;

        return (
            <AppBar
                className={classes.appBar}
            >
                {
                    user ?
                        user.typeId == 1 ?
                            <Toolbar variant="dense" >
                                <Typography style={{ color: '#3bb6eb' }} variant="h5" >E-chemist</Typography>
                                <div className={classes.grow} />
                                {links.map((link, key) => (
                                    <Button
                                        className={this.isActive(link.name) ? classes.active : undefined}
                                        onClick={this.handleClickLink(link)}
                                        key={key}
                                        style={{ display: this.isShow(key) ? "inline-flex" : "none" }}
                                    >
                                        <link.Icon color="inherit" className={classes.icon} />
                                        <Typography className={this.isActive(link.name) ? classes.active : classes.link} >{link.label}</Typography>
                                    </Button>
                                ))}
                                <Button onClick={this.handleClickMoreIcon} id="menuMore" style={{ display: width < 140 * 78 ? "inline-flex" : "none" }} >
                                    <MoreVertIcon className={classes.icon} />
                                    <Typography className={classes.link} >More</Typography>
                                </Button>
                                <Menu anchorEl={document.getElementById("menuMore")} onClose={this.handleCloseMoreMenu} open={more} >
                                    {links.map((link, key) => (
                                        <MenuItem onClick={this.handleClickLink(link)} key={key} style={{ display: !this.isShow(key) ? "flex" : "none" }} >
                                            <ListItemIcon>
                                                <link.Icon className={this.isActive(link.name) ? classes.active : undefined} />
                                            </ListItemIcon>
                                            <ListItemText primaryTypographyProps={{ className: this.isActive(link.name) ? classes.active : undefined }} primary={link.label} />
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Toolbar>
                            :
                            user.typeId == 3 ?
                                <Toolbar variant="dense" >
                                    <Typography style={{ color: '#3bb6eb' }} variant="h5" >E-chemist</Typography>
                                    <div className={classes.grow} />
                                    {links2.map((link, key) => (
                                        <Button
                                            className={this.isActive(link.name) ? classes.active : undefined}
                                            onClick={this.handleClickLink(link)}
                                            key={key}
                                            style={{ display: this.isShow(key) ? "inline-flex" : "none" }}
                                        >
                                            <link.Icon color="inherit" className={classes.icon} />
                                            <Typography className={this.isActive(link.name) ? classes.active : classes.link} >{link.label}</Typography>
                                        </Button>
                                    ))}
                                </Toolbar>
                                :
                                user.typeId == 2 ?
                                    <Toolbar variant="dense" >
                                        <Typography style={{ color: '#3bb6eb' }} variant="h5" >E-chemist</Typography>
                                        <div className={classes.grow} />
                                        {links3.map((link, key) => (
                                            <Button
                                                className={this.isActive(link.name) ? classes.active : undefined}
                                                onClick={this.handleClickLink(link)}
                                                key={key}
                                                style={{ display: this.isShow(key) ? "inline-flex" : "none" }}
                                            >
                                                <link.Icon color="inherit" className={classes.icon} />
                                                <Typography className={this.isActive(link.name) ? classes.active : classes.link} >{link.label}</Typography>
                                            </Button>
                                        ))}
                                    </Toolbar>
                                    : null
                        : null
                }
            </AppBar>
        )
    }

    public isShow = (index: number): boolean => {
        const windowWidth = this.state.width;

        const menuWidth = windowWidth / 2;

        return menuWidth > (index + 1) * 140;
    }

    public isActive = (name: string): boolean => {
        const { match } = this.props;
        return match.path.substr(1, match.path.length) == name;
    }

    protected handleClickMoreIcon = () => {
        this.setState({ more: true });
    }

    protected handleCloseMoreMenu = () => {
        this.setState({ more: false });
    }

    protected handleClickLink = (link: HeaderLink) => () => {
        if (link.onClick) {
            link.onClick();
        } else {
            this.props.history.push("/" + link.name);
        }
    }
}

// export default  styler(withRouter(Header));
export default connect(mapStateToProps, mapDispatchToProps)(styler(withRouter(Header)));
