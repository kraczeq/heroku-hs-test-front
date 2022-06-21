import "./PageTitle.css"

const PageTitle = ({ pageTitle }) =>
{
    return (
        <div>
            <div className="PageTitle">
                <div className="Title">
                    {pageTitle}
                </div>
                <div className="UserLine"></div>
            </div>
        </div>
    );
}

export default PageTitle;