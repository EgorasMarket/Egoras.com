import Home from "../components/Home/Home";
import Login from "../components/Authentication/Login/Login";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MemberShipPage from "../components/MemberShip/MemberShipPage";
import ProductDetail from "../components/Market/ProductDetail";
import ProductDetailPage from "../components/Market/ProductDetailPage";
import ProductCheckoutPage from "../components/Market/ProductCheckoutPage";
import Signup from "../components/Authentication/Signup/Signup";
import DashboardWallets from "../components/Dashboard/DashboardPages/DashboardWallets";
import AppVerification from "../components/Verification/Appverification";
import DasboardMember from "../components/Dashboard/DashboardPages/DasboardMember";
import DashboardSwap from "../components/Dashboard/DashboardPages/DashboardSwap";
import DashboardOrders from "../components/Dashboard/DashboardPages/DashboardOrders";
import DashboardTransactions from "../components/Dashboard/DashboardPages/DashboardTransactions";
import DashboardProducts from "../components/Dashboard/DashboardPages/DashboardProducts";
import DashboardHome from "../components/Dashboard/DashboardPages/DashboardHome";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import KycPage from "../components/KYC/KycPage";
import Privacy from "../components/PrivacyPolicy/Privacy";
import TermsAndConditions from "../components/PrivacyPolicy/TermsAndConditions";
import DashboardReferral from "../components/Dashboard/DashboardPages/Referral/DashboardReferral";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
// import
import Groups2Icon from "@mui/icons-material/Groups2";
import StoreIcon from "@mui/icons-material/Store";
import NotFoundComponent from "../components/Home/NotFoundComponent";

const routes = [
  { name: "Home", path: "", component: <Home />, layout: "/" },
  { name: "Signup", path: "signup", component: <Signup />, layout: "/" },
  { name: "Login", path: "login", component: <Login />, layout: "/" },
  {
    name: "Terms & Conditions",
    path: "terms-conditions",
    component: <TermsAndConditions />,
    layout: "/",
  },
  {
    name: "Terms & Conditions",
    path: "privacy",
    component: <Privacy />,
    layout: "/",
  },
  {
    name: "Membership",
    path: "membership/sub",
    component: <MemberShipPage />,
    layout: "/",
  },
  {
    name: "verify",
    path: "verify/email/address/:id",
    component: <AppVerification />,
    layout: "/",
  },
  {
    name: "Product Detail",
    path: "productdetail/:id/:name",
    component: <ProductDetail />,
    layout: "/",
  },
  {
    name: "404 Not Found",
    path: "*",
    component: <NotFoundComponent />,
    layout: "/",
  },
  {
    name: "Kyc",
    path: "kyc/verify",
    component: <KycPage />,
    layout: "/",
  },
  {
    name: "Product Detail Page",
    path: "productCheckout/:id/:count/:name",
    component: <ProductCheckoutPage />,
    layout: "/",
  },
  {
    name: "Chekout",
    path: "productdetailorder/:id/:name",
    component: <ProductDetailPage />,
    layout: "/",
  },
  {
    name: "Dashboard",
    path: "home",
    icon: <GridViewRoundedIcon className="DashboardNav_body_1_icon" />,
    component: <DashboardHome />,
    layout: "/dashboard",
  },
  {
    name: "Wallets",
    path: "wallet",
    icon: (
      <AccountBalanceWalletOutlinedIcon className="DashboardNav_body_1_icon" />
    ),
    component: <DashboardWallets />,
    layout: "/dashboard",
  },
  {
    name: "Products",
    path: "products",
    icon: <StoreIcon className="DashboardNav_body_1_icon" />,
    component: <DashboardProducts />,
    layout: "/dashboard",
  },
  {
    name: "Ego SalesPro",
    path: "egocoop",
    icon: <CorporateFareIcon className="DashboardNav_body_1_icon" />,
    component: <DashboardReferral />,
    layout: "/dashboard",
  },

  {
    name: "Swap",
    path: "swap",
    icon: <SwapHorizOutlinedIcon className="DashboardNav_body_1_icon" />,
    component: <DashboardSwap />,
    layout: "/dashboard",
  },

  // {
  //   name: "Subsrciption",
  //   path: "membership",
  //   icon: <WorkspacePremiumOutlinedIcon className="DashboardNav_body_1_icon" />,
  //   component: <DasboardMember />,
  //   layout: "/dashboard",
  // },
  {
    name: "Orders",
    path: "orders",
    icon: <BookmarkBorderOutlinedIcon className="DashboardNav_body_1_icon" />,
    component: <DashboardOrders />,
    layout: "/dashboard",
  },
  {
    name: "Transactions",
    path: "transaction",
    icon: <ReceiptOutlinedIcon className="DashboardNav_body_1_icon" />,

    component: <DashboardTransactions />,
    layout: "/dashboard",
  },
];

export { routes };
