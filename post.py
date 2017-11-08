from os import listdir


def get_all_posts():
    return [parse_post_from_markdown('posts/' + post) for post in listdir('posts/')]


def parse_post_from_markdown(file_path):
    reading_config = True
    config_data = {}

    content = []

    with open(file_path, 'rb') as post_file:
        for line in post_file:
            line = line.strip()

            if line == '--':
                reading_config = False
                continue

            if reading_config:
                config_data[line.split('|')[0]] = line.split('|')[1]
            else:
                content.append(line)

    post = Post(title=config_data['title'], content=''.join(content))
    post.image = config_data.get('image')
    post.url = config_data.get('url')

    return post


class Post():

    def __init__(self, title, content):
        self.title = title
        self.content = content