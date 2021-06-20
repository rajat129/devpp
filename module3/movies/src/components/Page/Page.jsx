import React, { Component } from 'react';

class Page extends Component {
    state = {}
    render() {
        return (
            <nav aria-label="...">
                <ul class="pagination justify-content-center m-4">

                    {this.props.currentPage==1 ? 
                    (   <li class="page-item disabled">
                            <span class="page-link">Previous</span>
                        </li>
                    ) : (
                        <li class="page-item" onClick={this.props.previousPage}>
                            <span class="page-link">Previous</span>
                        </li>
                    )}

                    {this.props.pages.map((pagescount) => {
                        return pagescount == this.props.currentPage ? 
                        (<li class="page-item active"><a class="page-link">{pagescount}</a></li>
                        ) : (
                        <li class="page-item"><a class="page-link" onClick={()=>{this.props.setPage(pagescount)}}>{pagescount}</a></li>)
                    })}

                    {this.props.currentPage==this.props.pages.length ? 
                    (   <li class="page-item disabled">
                            <span class="page-link">Next</span>
                        </li>
                    ) : (
                        <li class="page-item" onClick={this.props.nextPage}>
                            <span class="page-link">Next</span>
                        </li>
                    )}
                </ul>
            </nav>
        );
    }
}

export default Page;