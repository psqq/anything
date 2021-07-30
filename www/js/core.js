var a = {
    plugins: [],
    delete_plugin(i) {
        this.plugins[i].___meta.saved = false;
        this.save_plugins();
    },
    save_plugin(id) {
        this.plugins[id].___meta.saved = true;
        this.save_plugins();
    },
    save_plugins() {
        var plugins_for_save = this.plugins.filter(p => p.___meta.saved).map(p => p.___meta);
        localStorage.setItem('plugins', JSON.stringify(plugins_for_save));
    },
    load_plugins() {
        var s = localStorage.getItem('plugins');
        if (!s) return;
        var saved_plugins = JSON.parse(s);
        this.plugins = saved_plugins.map(p => {
            var np = eval("(" + p.raw + ")");
            np.___meta = p;
            return np;
        });
    },
    onDeviceReady() {
        this.load_plugins();
        for (var plugin of this.plugins) {
            if (plugin.onDeviceReady) plugin.onDeviceReady();
        }
    },
    add_raw_plugin(body, plugin_url = "") {
        var plugin = eval("(" + body + ")");
        plugin.___meta = {
            raw: body,
            url: plugin_url,
            saved: false,
        };
        this.plugins.push(plugin);
        return this.plugins.indexOf(plugin);
    },
    download_plugin(plugin_url) {
        return cordovaFetch(plugin_url)
            .then((response) => {
                return response.text()
            })
            .then((body) => {
                return this.add_raw_plugin(body);
            });
    },
    get_plugin(id) {
        return this.plugins[id];
    },
};
