def minimize_css(file_path):
    import re

    css = open(file_path, 'r').read()

    # remove comments - this will break a lot of hacks :-P
    css = re.sub(r'\s*/\*\s*\*/', "$$HACK1$$", css)  # preserve IE<6 comment hack
    css = re.sub(r'/\*[\s\S]*?\*/', "", css)
    css = css.replace("$$HACK1$$", '/**/')  # preserve IE<6 comment hack

    # url() doesn't need quotes
    css = re.sub(r'url\((["\'])([^)]*)\1\)', r'url(\2)', css)

    # spaces may be safely collapsed as generated content will collapse them anyway
    css = re.sub(r'\s+', ' ', css)

    # shorten colors: #aabbcc to #abc
    css = re.sub(r'#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3(\s|;)', r'#\1\2\3\4', css)

    # fragment values can lose zeros
    css = re.sub(r':\s*0(\.\d+([cm]m|e[mx]|in|p[ctx]))\s*;', r':\1;', css)

    to_return = []
    for rule in re.findall(r'([^{]+){([^}]*)}', css):

        # we don't need spaces around operators
        selectors = [re.sub(r'(?<=[\[\(>+=])\s+|\s+(?=[=~^$*|>+\]\)])', r'', selector.strip()) for selector in rule[0].split(',')]

        # order is important, but we still want to discard repetitions
        properties = {}
        property_order = []
        for prop in re.findall('(.*?):(.*?)(;|$)', rule[1]):
            key = prop[0].strip().lower()
            if key not in property_order:
                property_order.append(key)
            properties[key] = prop[1].strip()

        # output rule if it contains any declarations
        if properties:
            to_return.append("%s{%s}" % (','.join(selectors), ''.join(['%s:%s;' % (key, properties[key]) for key in property_order])[:-1]))

    return ' '.join(to_return)