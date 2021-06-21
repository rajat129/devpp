import React, { Component } from 'react';

class Page extends Component {
    state = {}
    render() {
        return (
            <nav aria-label="...">
                <ul className="pagination justify-content-center m-4">

                    {this.props.currentPage==1 ? 
                    (   <li className="page-item disabled">
                            <span className="page-link">Previous</span>
                        </li>
                    ) : (
                        <li className="page-item" onClick={this.props.previousPage}>
                            <span className="page-link">Previous</span>
                        </li>
                    )}

                    {this.props.pages.map((pagescount) => {
                        return pagescount == this.props.currentPage ? 
                        (<li className="page-item active"><a className="page-link">{pagescount}</a></li>
                        ) : (
                        <li className="page-item"><a className="page-link" onClick={()=>{this.props.setPage(pagescount)}}>{pagescount}</a></li>)
                    })}

                    {this.props.currentPage==this.props.pages.length ? 
                    (   <li className="page-item disabled">
                            <span className="page-link">Next</span>
                        </li>
                    ) : (
                        <li className="page-item" onClick={this.props.nextPage}>
                            <span className="page-link">Next</span>
                        </li>
                    )}
                </ul>
            </nav>
        );
    }
}

export default Page;