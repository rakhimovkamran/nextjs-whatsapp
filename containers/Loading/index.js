import { DoubleBounce } from "better-react-spinkit"

const loaderContainerStyles = {
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    display: "flex",
    width: "100%",
}

export const Loading = () => {
    return (
        <div style={loaderContainerStyles}>
            <DoubleBounce size={100} color={"#3CBC2B"} />
        </div>
    )
}
