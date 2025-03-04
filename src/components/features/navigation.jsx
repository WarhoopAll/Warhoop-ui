import {useContext, useEffect, useState} from "react";
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
    Dropdown,
    DropdownTrigger,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import {Link as RouterLink, useLocation} from "react-router-dom";
import {UserContext} from "@/context/userContext";
import {Activity, TagUser} from "@/components/icons/icons";
import RegisterModal from "@/components/modals/registerModal";
import LoginModal from "@/components/modals/loginModal";
import images from "@/image.json";

export default function Navigation() {
    const location = useLocation();
    const {session, logout} = useContext(UserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const {t, i18n} = useTranslation();

    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");


    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language, i18n]);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const languageIcons = {
        en: <img src={images.en} alt="English Flag" width="24" height="18"/>,
        ru: <img src={images.ru} alt="English Flag" width="24" height="18"/>,
    };

    const getAvailableLanguages = () => ["en", "ru"].filter((lang) => lang !== language);

    const languageLabels = {
        en: "English",
        ru: "Русский",
    };

    const handleLogout = () => {
        logout();
    };

    const icons = {
        chevron: <img src={images.arrow} alt="English Flag" width="24" height="18"/>,
        activity: <Activity className="text-secondary" fill="currentColor" size={30}/>,
        user: <TagUser className="text-danger" fill="currentColor" size={30}/>,
    };

    const menuItems = [
        {label: t("Menu.Home"), path: "/"},
        {label: t("Menu.Armory"), path: "/armory"},
        {label: t("Menu.Online"), path: "/online"},
        {label: t("Menu.Ladder"), path: "/ladder"},
    ];

    return (<Navbar
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
                <Link as={RouterLink} to="/" color="foreground">{t("Menu.Home")}</Link>
            </NavbarItem>
            <NavbarItem isActive={location.pathname.startsWith("/armory")}>
                <Tooltip className="top" showArrow={true} content={t("Menu.DescArmory")}>
                    <Link as={RouterLink} to="/armory" className="text-foreground">{t("Menu.Armory")}</Link>
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
                        aria-label="warhoop"
                        className="w-[340px]"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        <DropdownItem
                            key="ladder"
                            description={t("Menu.DescLadder")}
                            startContent={icons.user}
                            as={RouterLink}
                            to="/ladder"
                        >
                            {t("Menu.Ladder")}
                        </DropdownItem>
                        <DropdownItem
                            key="online_players"
                            description={t("Menu.DescOnline")}
                            startContent={icons.activity}
                            as={RouterLink}
                            to="/online"
                        >
                            {t("Menu.Online")}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </NavbarContent>
        <NavbarContent justify="end">
            <Dropdown>
                <DropdownTrigger>
                    <Button className="buttonClose lang-switch">
                        {languageIcons[language]} {language} {icons.chevron}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Language selection">
                    {getAvailableLanguages().map((lang) => (
                        <DropdownItem textValue="lang" key={lang} onPress={() => changeLanguage(lang)}>
                            <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                                <img
                                    src={lang === "en" ? images.en : images.ru}
                                    alt={`${languageLabels[lang]} Flag`}
                                    width={24}
                                    height={18}
                                />
                                {languageLabels[lang]}
                            </div>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

            {session ? (<>

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
                                </DropdownItem>)}
                            <DropdownItem className="h-11 mb-2" key="settings"
                                          as={RouterLink} to="/account/panel">{t("Menu.UserPanel")}</DropdownItem>
                            {session?.access?.security_level >= 2 && (
                                <DropdownItem className="h-11 mb-2" key="admins"
                                              as={RouterLink} to="/admin">{t("Menu.AdminPanel")}</DropdownItem>)}
                            <DropdownItem key="logout" onPress={handleLogout}>
                                {t("Menu.SignOut")}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </>) : (<>
                <NavbarItem>
                    <LoginModal t={t}/>
                </NavbarItem>
                <NavbarItem>
                    <RegisterModal t={t}/>
                </NavbarItem>
            </>)}
            <NavbarMenu>
                {menuItems.map(({label, path}, index) => (
                    <NavbarMenuItem key={`${label}-${index}`}>
                        <Link className="w-full mt-3" color="foreground" as={RouterLink} to={path} size="lg">
                            {label}
                        </Link>
                    </NavbarMenuItem>
                ))}
                {!session && (<NavbarMenuItem>
                    <LoginModal t={t}/>
                </NavbarMenuItem>)}
            </NavbarMenu>
        </NavbarContent>

    </Navbar>);
}
