from os import listdir


def get_all_projects():
    return [parse_project_from_markdown('projects/' + project) for project in listdir('projects/')]


def parse_project_from_markdown(file_path):
    reading_config = True
    config_data = {}

    content = []

    with open(file_path, 'rb') as project_file:
        for line in project_file:
            line = line.strip()

            if line == '--':
                reading_config = False
                continue

            if reading_config:
                config_data[line.split('|')[0]] = line.split('|')[1]
            else:
                content.append(line)

    project = Project(project=config_data['project'], content=''.join(content))
    project.image = config_data.get('image')
    project.url = config_data.get('url')

    return project


class Project():

    def __init__(self, project, content):
        self.project = project
        self.content = content