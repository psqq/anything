var plugins_el = document.querySelector('#plugins');

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    a.onDeviceReady();
    update_list_of_plugins();
}

function update_list_of_plugins() {
    plugins_el.innerHTML = '';
    if (a.plugins.length < 1) return;
    var i = 0;
    for (var plugin of a.plugins) {
        var s = `<b>${plugin.name}</b>`;
        s += ` <button onclick="window.a.plugins[${i}].run()">run</button>`;
        if (plugin.___meta.saved) {
            s += ` <button onclick="window.a.delete_plugin(${i});window.update_list_of_plugins();">delete</button>`;
        } else {
            s += ` <button onclick="window.a.save_plugin(${i});window.update_list_of_plugins();">save</button>`;
        }
        plugins_el.innerHTML += `
            <div style="padding: 10px">
                 ${s}
            </div>
        `;
        i++;
    }
}

document.querySelector('#add-plugin-btn').addEventListener('click', e => {
    var plugin_url = prompt('Url of plugin js file (for example: https://my-web-site.com/my-awesome-plugin.js)');
    a.download_plugin(plugin_url)
        .then((id) => {
            a.save_plugin(id);
            update_list_of_plugins();
        });
});
