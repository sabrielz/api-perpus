# Dokumentasi API Perpus

## Daftar Isi
<ol style="margin-left: -1rem">
    <li><a href="#dependency">Dependencies</a></li>
    <li><a href="#response">Response Value</a></li>
    <li><a href="#middleware">Middleware</a></li>
    <li><a href="#basic">Basic Usage</a></li>
    <li><a href="#auth">Authentication</a>
        <ol style="margin-left: -1rem; list-style-type: upper-alpha">
            <li><a href="#login">Login</a></li>
            <li><a href="#register">Register</a></li>
            <li><a href="#check">Cek Token</a></li>
        </ol>
    </li>
    <li><a href="#module">Module</a>
        <ol style="margin-left: -1rem; list-style-type: upper-alpha">
            <li><a href="#moduleGet">Get</a></li>
            <li><a href="#modulePost">Post</a></li>
            <li><a href="#modulePut">Put</a></li>
            <li><a href="#moduleDelete">Delete</a></li>
        </ol>
    </li>
</ol>

<div style="width: 100%; margin: 2rem"></div>

<ol style="margin-left: -1rem;">
    <li id="dependency" style="margin-bottom: 2rem;">
        <h2 style="font-weight: bold; font-size: 1.5rem;">
            Dependencies
        </h2>
        <p>
            This API created with some dependency.
            <ol style="margin-left: -1rem; list-style-type: upper-alpha">
                <li>Express</li>
                <li>Objection</li>
                <li>Knex</li>
                <li>Json Web Token</li>
                <li>...</li>
            </ol>
        </p>
    </li>
    <li id="response" style="margin-bottom: 2rem;">
        <h2 style="font-weight: bold; font-size: 1.5rem;">
            Response Value
        </h2>
        <p>
            Response value will contain <b>data</b>
            if success, or <b>err</b> if request failed for
            some reason. Response value never return <b>data</b>
            and <b>err</b> together, always one of them.
        </p>
<pre>
{
    message: <b><i>string</i></b>,
    err | data: <b><i>object</i></b>
}
</pre>
        <p>
            Or you can use <b><i>status code</i></b> to
            detect error. The <b><i>status code</i></b>
            always contain <b>200</b> if every request
            processed successfully, or contain 
            <b>400 < 404</b> if request need some value to send
            with request like <b>body</b> or <b>url params</b>,
            and contain <b>500</b> if some error occured when
            processing request like problem with database
            connection or any internal problem.
        </p>
    </li>
    <li id="middleware" style="margin-bottom: 2rem;">
        <h2 style="font-weight: bold; font-size: 1.5rem;">
            Middleware
        </h2>
        <p>
            Other entry point except <b>Authentication</b> point
            require <b>middleware</b> to continue process.
            To pass the middleware, you need login first and
            get the <b>jwt</b> token. Then pass the token in
            data parameter. The <b>express</b> catch token
            in <i>req.body.token | req.query.token |
            req.headers.authorization | req.headers.token</i>.
            Otherwise the response will return this value :
<pre>
{
    message: 'Required token to continue!',
    err: {} // blank object
}
</pre>
        </p>
    </li>
    <li id="basic" style="margin-bottom: 2rem;">
        <h2 style="font-weight: bold; font-size: 1.5rem;">
            Basic Usage
        </h2>
        <p>
            Use <b>axios</b> or other plugins to get data
            response from ajax.
        </p>
<pre>
axios.post(<b><i>url</i></b>, <b><i>body</i></b>)
.then(<b><i>res</i></b> => {
    if (<b><i>res.err</i></b>) alert('Request failed!') <br>
    // Code to run if request successfully
})
</pre>
    </li>
    <li id="auth" style="margin-bottom: 2rem;">
        <h2 style="font-weight: bold; font-size: 1.5rem;">
            Authentication
        </h2>
        <p>
            A path or endpoint to authentication and authorization
            user.
        </p>
        <ol style="margin-left: -1rem; list-style-type: upper-alpha">
            <li id="login" style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem;">
                    Login
                </h3>
                <p>
                    Response value will have json web 
                    <b>token</b> if authentication successfull.
                </p>
<pre>
{
    message: <b><i>string</i></b>,
    ?err: <b><i>object</i></b>, // throw knex | jwt error
    ?data: <b><i>object</i></b>, // data used to login
    token: <b><i>string</i></b> // json web token
}
</pre>
            </li>
            <li id="register" style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem;">
                    Register
                </h3>
                <p>
                    Response value will return <b><i>object</i></b>
                    that inserted to table except <i>password</i>.
                </p>
<pre>
{
    message: <b><i>string</i></b>,
    ?err: <b><i>object</i></b>, // knex throw error
    ?data: <b><i>object</i></b>, // data inserted to table
}
</pre>
            </li>
            <li>
                <h3 style="font-size: 1.25rem;">
                    Check
                </h3>
                <p>
                    Response value will contain <b>object</b>
                    from json web token.
                </p>
<pre>
{
    message: <b><i>string</i></b>,
    ?err: <b><i>object</i></b>, // jwt throw error
    ?data: <b><i>object</i></b>, // jwt success object
}
</pre>
            </li>
        </ol>
    </li>
    <li id="module" style="margin-bottom: 2rem;">
        <h2 style="font-weight: bold; font-size: 1.5rem;">
            Module
        </h2>
        <p>
            The module rest has 2 type, <b>ebook</b> and
            <b>video</b>. It detected automatically in first
            url path, <code>/ebook</code> and <code>/video</code>.
        </p>
        <ol style="margin-left: -1rem; list-style-type: upper-alpha">
            <li id="moduleGet">
                <h3 style="font-size: 1.25rem;">
                    Get
                </h3>
                <code style="font-size: 1rem;">
                    /<b><i>:type</i></b>
                </code>
                <p>
                    The <b>GET</b> method will paginate automatically
                    with 8 items. It paginate from sql query with 
                    <code>OFFSET</code> and <code>LIMIT</code>.
                    You can change paginate limit in <code>
                    controllers/modulController</code>.
                </p>
<pre>
{
    message: <b><i>string</i></b>,
    ?err: <b><i>object</i></b>, // knex throw error
    ?data: [ // paginated data
        ...
        <b><i>object</i></b> // each data module
    ]
}
</pre>
            </li>
            <li id="modulePost">
                <h3 style="font-size: 1.25rem;">
                    Post
                </h3>
                <code style="font-size: 1rem;">
                    /<b><i>:type</i></b>
                </code>
                <p>
                    The <b>POST</b> method require parameter that
                    contain data to insert, otherwise will return
                    error.
                </p>
<pre>
{
    message: <b><i>string</i></b>,
    ?err: <b><i>object</i></b>, // knex throw error
    ?data: <b><i>object</i></b> // contain inserted data
}
</pre>
            </li>
            <li id="modulePut">
                <h3 style="font-size: 1.25rem;">
                    Put
                </h3>
                <code style="font-size: 1rem;">
                    /<b><i>:type</i></b>/<b><i>:id</i></b>
                </code>
                <p>
                    The <b>PUT</b> method require url parameter that
                    contain id to change, and require data
                    parameter that contain data to change.
                </p>
<pre>
{
    message: <b><i>string</i></b>,
    ?err: <b><i>object</i></b>, // knex throw error
    ?data: <b><i>object</i></b> // contain changed data
}
</pre>
            </li>
            <li id="modulePut">
                <h3 style="font-size: 1.25rem;">
                    Put
                </h3>
                <code style="font-size: 1rem;">
                    /<b><i>:type</i></b>/<b><i>:id</i></b>
                </code>
                <p>
                    The <b>PUT</b> method require url parameter that
                    contain id to change, and require data
                    parameter that contain data to change.
                </p>
<pre>
{
    message: <b><i>string</i></b>,
    ?err: <b><i>object</i></b>, // knex throw error
    ?data: <b><i>object</i></b> // contain changed data
}
</pre>
            </li>
            <li id="moduleDelete">
                <h3 style="font-size: 1.25rem;">
                    Delete
                </h3>
                <code style="font-size: 1rem;">
                    /<b><i>:type</i></b>/<b><i>:id</i></b>
                </code>
                <p>
                    The <b>DELETE</b> method only require url parameter that
                    contain id to delete.
                </p>
<pre>
{
    message: <b><i>string</i></b>,
    ?err: <b><i>object</i></b>, // knex throw error
    ?data: <b><i>object</i></b> // contain boolean result
}
</pre>
            </li>
        <ol>
    </li>
</ol>
Others coming soon...