# Dokumentasi API Perpus

## Daftar Isi
<ol style="margin-left: -1rem">
    <li><a href="#knowledge">Basic Knowlege</a></li>
    <li><a href="#auth">Authentication</a>
        <ol style="margin-left: -1rem; list-style-type: upper-alpha">
            <li><a href="#login">Login</a></li>
            <li><a href="#register">Register</a></li>
            <li><a href="#check">Cek Token</a></li>
        </ol>
    </li>
</ol>

<div style="width: 100%; margin: 2rem"></div>

<ol style="margin-left: -1rem;">
    <li>
        <h2 style="font-weight: bold; font-size: 1.5rem;">
            Authentication
        </h2>
        <ol style="margin-left: -1rem; list-style-type: upper-alpha">
            <li>
                <h3 style="font-size: 1.25rem;">
                    Login
                </h3>
                <pre>
axios.post('http:localhost:4000/login', {
    email: <b><i>string</i></b>,
    password: <b><i>string</i></b>
}).then(data => {
    /* Data response variable will contain this:
    Success Request ? data.data : data.err;
    data = {
        message: <b><i>string</i></b>,
        ?err: <b><i>object</i></b> | ?data: <b><i>object</i></b>
    }
    */<br>
    if (data.err) {
        alert('Request failed!')
    }
    alert('Request successfully!');
})
</pre>
            </li>
        </ol>
    </li>
</ol>