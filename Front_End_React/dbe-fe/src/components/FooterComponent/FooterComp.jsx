import localStyles from './FooterCompCSS.module.css'

export default function Footer() {

    return (
        <>
            <footer className={localStyles.base_footer}>
            <p>© Drone Box Express Ltd.</p>
            <p>This website is purely for experimental purposes</p>
            <p>No order will actually be delivered</p>
            <p>22 March 2025</p>
            </footer>
        </>
    )
}