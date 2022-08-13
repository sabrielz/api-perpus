# Documentation API Perpus

## Daftar Isi
<ol style="margin-left: -1rem">
    <li><a href="#dependency">Dependencies</a></li>
    <li><a href="#config">Config</a></li>
    <li><a href="#response">Response Value</a></li>
    <li><a href="#middleware">Middleware</a></li>
    <li><a href="#basic">Basic Usage</a></li>
    <li><a href="#model">Model Schema</a>
        <ol style="margin-left: -1rem; list-style-type: upper-alpha">
            <li><a href="#modelUser">User</a></li>
            <li><a href="#modelModul">Modul</a></li>
        </ol>
    </li>
    <li><a href="#api">Utility / Schema Control</a>
        <ol style="margin-left: -1rem; list-style-type: upper-alpha">
            <li><a href="#remigrate">Remigrate</a></li>
            <li><a href="#migrate">Migrate</a></li>
            <li><a href="#drop">Drop</a></li>
            <li><a href="#truncate">Truncate</a></li>
            <li><a href="#seed">Seed</a></li>
            <li><a href="#count">Count</a></li>
            <li><a href="#example">Example</a></li>
        </ol>
    </li>
    <li><a href="#auth">Authentication</a>
        <ol style="margin-left: -1rem; list-style-type: upper-alpha">
            <li><a href="#login">Login</a></li>
            <li><a href="#register">Register</a></li>
            <li><a href="#check">Check Token</a></li>
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
    <li id="config" style="margin-bottom: 2rem;">
        <h2 style="font-weight: bold; font-size: 1.5rem;">
            Config
        </h2>
        <p>
            The file config stored in <code>config/:configName</code>.
            For database connection, config file stored as <code>
            knex.js</code> in <b>development</b> key.
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
axios.get(<b><i>url</i></b>, <b><i>?data</i></b>, <b><i>?header</i></b>)
.then(<b><i>res</i></b> => {
    if (<b><i>res.data.err</i></b>) alert('Request failed!')<br>
    // Code to run if request succees
})
axios.post(<b><i>url</i></b>, <b><i>?data</i></b>, <b><i>?header</i></b>)
.then(<b><i>res</i></b> => {
    if (<b><i>res.data.err</i></b>) alert('Request failed!')<br>
    // Code to run if request succees
})
</pre>
        <p>
            Example if request need <b>json web token</b> as middleware.
        </p>
<pre>
let header = {
    authorization: <b><i>json web token</i></b>
}
axios.post('../modul', {
    title: <b><i>string</i></b>,
    ?slug: <b><i>string</i></b>, // auto generate if null
    desc: <b><i>string</i></b>,
    thumbnail: <b><i>file</i></b> | <b><i>image</i></b>
}, { header: <b><i>header</i></b> })
.then(res => {
    if (<b><i>res.data.err</i></b>) alert('Request failed!')<br>
    // Code to run if request succees
})
</pre>
    </li>
    <li id="model" style="margin-bottom: 2rem;">
        <h2 style="font-weight: bold; font-size: 1.5rem;">
            Model Schema
        </h2>
        <p>
            All table schema defined in <b>Model</b> class
            located in <code>models/:modelName</code>. The
            following contains schema all table.
        </p>
        <ol style="margin-left: -1rem; list-style-type: upper-alpha">
            <li id="modelUser" style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem;">
                    User
                </h3>
<pre>
CREATE TABLE `users` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `nama` varchar(255) DEFAULT NULL,
    `email` varchar(255) DEFAULT NULL,
    `password` varchar(255) DEFAULT '123456', // md5
    `ttl` varchar(255) DEFAULT NULL,
    `sekolah` varchar(255) DEFAULT NULL,
    `alasan` text DEFAULT NULL,
    `hp` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
</pre>
            </li>
            <li id="modelModul" style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem;">
                    Modul
                </h3>
<pre>
CREATE TABLE `moduls` (
    `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `title` varchar(255) DEFAULT NULL,
    `slug` varchar(255) DEFAULT NULL,
    `desc` varchar(255) DEFAULT NULL,
    `thumbnail` varchar(255) DEFAULT NULL,
    `type` varchar(255) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
    `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`),
    UNIQUE KEY `moduls_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
</pre>
            </li>
        </ol>
    </li>
    <li id="api" style="margin-bottom: 2rem;">
        <h2 style="font-weight: bold; font-size: 1.5rem;">
            Utility / Schema Control
        </h2>
        <p>
            A utility for table schema control, like migrate table,
            drop table, truncate table, and up to migrate and drop
            table in same time. This entry point does not require
            <b>json web token</b> as middleware to process. All of
            this entry point using <b>GET</b> method. <code>
            remigrate, migrate, drop, truncate</code> point will
            contain this value.
        </p>
<pre>
{
    message: <b><i>string</i></b>,
    ?err: <b><i>object</i></b>, // throw knex error
    ?data: <b><i>object</i></b>, // table query result
}
</pre>
        <p>
            Table schema structure file stored in <code>
            models/:modelName</code>.
        </p>
        <ol style="margin-left: -1rem; list-style-type: upper-alpha">
            <li id="remigrate" style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem;">
                    Remigrate
                </h3>
                <code>
                    /api/remigrate/:model
                </code>
                <p>
                    Utility to migrate and drop table if exists
                    in same time.
                </p>
            </li>
            <li id="migrate" style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem;">
                    Migrate
                </h3>
                <code>
                    /api/migrate/:model
                </code>
                <p>
                    Utility to migrate table if exists.
                </p>
            </li>
            <li id="drop" style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem;">
                    Drop
                </h3>
                <code>
                    /api/drop/:model
                </code>
                <p>
                    Utility to drop table if exists.
                </p>
            </li>
            <li id="truncate" style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem;">
                    Truncate
                </h3>
                <code>
                    /api/remigrate/:model
                </code>
                <p>
                    Utility to truncate table. This utility
                    will return <i>error</i> if the model has
                    <i>foreign key</i> related to other tables.
                </p>
            </li>
            <li id="seed" style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem;">
                    Seed
                </h3>
                <code>
                    /api/seed/:model
                </code>
                <p>
                    Utility to generate random data and insert
                    it to table for debugging reason. The seed
                    schema file located in <code>seeds/:modelName
                    </code>. This entry point will return data
                    that been inserted to table.
                </p>
<pre>
{
    message: <b><i>string</i></b>,
    ?err: <b><i>object</i></b>, // knex throw error
    ?data: [
        ...
        <b><i>object</i></b> // inserted data
    ]
}
</pre>
            </li>
            <li id="count" style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem;">
                    Count
                </h3>
                <code>
                    /api/count/:model
                </code>
                <p>
                    Utility to get number of rows based id in a table.
                    This entry point will return number of rows.
                </p>
<pre>
{
    message: <b><i>string</i></b>,
    ?err: <b><i>object</i></b>, // knex throw error
    ?data: <b><i>number</i></b> // number of rows
}
</pre>
            </li>
            <li id="apiExample" style="margin-bottom: 2rem;">
                <h3 style="font-size: 1.25rem;">
                    Example
                </h3>
<pre>
axios.get('.../api/remigrate/modul')
.then(<b><i>res</i></b> => {
    if (<b><i>res.data.err</i></b>) alert('Request failed')<br>
    // Code to run if success
})
</pre>
            </li>
        </ol>
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
                <code>
                    /login
                </code>
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
                <code>
                    /register
                </code>
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
                <code>
                    /check
                </code>
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
            Both <code>ebook</code> and <code>video</code> leads
            to <b>Modul</b> class model.
        </p>
        <ol style="margin-left: -1rem; list-style-type: upper-alpha">
            <li id="moduleGet">
                <h3 style="font-size: 1.25rem;">
                    Get
                </h3>
                <code style="font-size: 1rem;">
                    /<b><i>:type</i></b>?page=<b><i>page</i></b>
                </code>
                <p>
                    The <b>GET</b> method will paginate automatically
                    with 8 items. Page number defined in url parameter
                    like <code>?page=4</code>, default is <code>1</code>
                    It paginate from sql query with
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