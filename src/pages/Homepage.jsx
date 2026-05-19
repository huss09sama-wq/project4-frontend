import React from 'react';
import { Link } from 'react-router';

const Homepage = ({}) => {
    return (
        <div>
            <header>
                <h1>Welcome to Developer library</h1>
                <p>Your personal repository for tracking code snippets, logic flows, and architectural categories.</p>
            </header>

            <hr />

            
                <div>
                    <h2>Workspace Dashboard</h2>
                    <div>
                        <h3>Manage Categories</h3>
                        <p>Organize your code by framework, language, or system module.</p>
                        <Link to="/categories">
                            <button>Go to Categories</button>
                        </Link>
                    </div>

                    <br />

                    <div>
                        <h3>Code Snippets</h3>
                        <p>View, search, edit, or create your documented logic blocks.</p>
                        <Link to="/snippets">
                            <button>View Snippets</button>
                        </Link>
                    </div>
                </div>
        </div>
    );
};

export default Homepage;