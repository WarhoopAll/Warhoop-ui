import {useContext, useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    DropdownItem,
    DropdownMenu,
    User,
    Tooltip,
    Button,
    Dropdown, DropdownTrigger, NavbarMenuToggle, NavbarMenu, NavbarMenuItem
} from "@nextui-org/react";

import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import {UserContext} from "@/context/userContext";
import {Activity, ChevronDown, TagUser} from "@/components/icons/icons";
import RegisterModal from "@/components/modals/registerModal";
import LoginModal from "@/components/modals/loginModal";

export default function Navigation() {
    const {t} = useTranslation();
    const location = useLocation();
    const {session, logout} = useContext(UserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
    };
    const icons = {
        chevron: <ChevronDown fill="currentColor" size={16}/>,
        activity: <Activity className="text-secondary" fill="currentColor" size={30}/>,
        user: <TagUser className="text-danger" fill="currentColor" size={30}/>,
    };

    const menuItems = [
        `${t("Menu.Home")}`,
        `${t("Menu.Armory")}`,
        `${t("Menu.Online")}`,
        `${t("Menu.Ladder")}`,
    ];

    return (
        <>
            <Navbar
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                className="wow-navbar wow-bg-background"
            >
                <NavbarContent className="sm:hidden text-white">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"}/>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-10 " justify="center">
                    <NavbarBrand className="">
                        <img width="100" src={`/assets/bg/Medivh.png`}/>
                    </NavbarBrand>

                    <NavbarItem isActive={location.pathname === "/"}>
                        <Link color="foreground" href="/">{t("Menu.Home")}</Link>
                    </NavbarItem>
                    <NavbarItem isActive={location.pathname.startsWith("/armory")}>
                        <Tooltip className="top" showArrow={true}
                                 content={t("Menu.DescArmory")}>
                            <Link color="foreground" href="/armory/">{t("Menu.Armory")}</Link>
                        </Tooltip>
                    </NavbarItem>
                    <div
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <Dropdown
                            isOpen={isDropdownOpen}
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <DropdownTrigger>
                                <Button
                                    onMouseEnter={() => {
                                        setIsDropdownOpen(true);
                                        if (isUserOpen) {
                                            setIsUserOpen(false);
                                        }
                                    }}
                                    disableRipple
                                    endContent={icons.chevron}
                                    radius="sm"
                                    variant="light"
                                >
                                    {t("Menu.Statistic")}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="ACME features"
                                className="w-[340px]"
                                itemClasses={{
                                    base: "gap-4",
                                }}
                            >
                                <DropdownItem
                                    key="ladder"
                                    description={t("Menu.DescLadder")}
                                    startContent={icons.user}
                                    href="/ladder"
                                >
                                    {t("Menu.Ladder")}
                                </DropdownItem>
                                <DropdownItem
                                    key="online_players"
                                    description={t("Menu.DescOnline")}
                                    startContent={icons.activity}
                                    href="/online"
                                >
                                    {t("Menu.Online")}
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </NavbarContent>
                {session ? (
                    <NavbarContent as="div" justify="end">
                        <div
                        >
                            <Dropdown
                            >
                                <DropdownTrigger>
                                    <User
                                        onMouseEnter={() => {
                                            setIsUserOpen(true);
                                            if (isDropdownOpen) {
                                                setIsDropdownOpen(false);
                                            }
                                        }}
                                        className="text-white"
                                        name={session?.profile?.name}
                                        description={t(session?.account_permissions)}
                                        avatarProps={{
                                            src: session?.profile?.avatar || '/assets/avatar/default.png',
                                        }}
                                    ></User>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profiles" variant="flat">
                                    {session?.coins > 0 && (
                                        <DropdownItem isDisabled key="profile" className="h-11 mb-2" textValue="Profile">
                                            <p className="font-semibold">
                                                {t("Coins")}: <span className="font-semibold">{session?.coins}</span>
                                            </p>
                                        </DropdownItem>
                                    )}
                                    <DropdownItem className="h-11 mb-2" key="settings"
                                                  href="/account/panel">{t("Menu.UserPanel")}</DropdownItem>
                                    {session?.access?.security_level >= 2 && (
                                        <DropdownItem className="h-11 mb-2" key="admins" href="/admin">{t("Menu.AdminPanel")}</DropdownItem>
                                    )}
                                    <DropdownItem key="logout" onPress={handleLogout} >
                                        {t("Menu.SignOut")}
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </NavbarContent>
                ) : (
                    <NavbarContent justify="end" className="hidden lg:flex floating">
                        <NavbarItem>
                            <LoginModal t={t}/>
                        </NavbarItem>
                        <NavbarItem>
                            <RegisterModal t={t}/>
                        </NavbarItem>
                    </NavbarContent>
                )}
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                className="w-full"
                                color={
                                    item === `${t("Menu.Armory")}` ? "foreground" : item === `${t("Menu.Online")}` ? "foreground" : item === `${t("Menu.Ladder")}` ? "foreground" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                href={item === `${t("Menu.Home")}` ? "/" : item === `${t("Menu.Armory")}` ? "/armory" : item === `${t("Menu.Online")}` ? "/online" : item === `${t("Menu.Ladder")}` ? "/ladder" : "#"}
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                    {!session && (
                        <NavbarMenuItem>
                            <LoginModal t={t}/>
                        </NavbarMenuItem>
                    )}
                </NavbarMenu>
            </Navbar>
        </>
    );
}
