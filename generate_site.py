from datetime import datetime
from jinja2 import Environment, FileSystemLoader
from optimization import minimize_css
from post import get_all_posts
from project import get_all_projects
from time import time


time_stamp = datetime.fromtimestamp(time()).strftime('%Y-%m-%d %H:%M:%S')

environment = Environment(loader=FileSystemLoader(searchpath='templates'))
posts = get_all_posts()
projects = get_all_projects()

# Generate home page.

home_template = environment.get_template('home.html')
home_content = home_template.render(
    custom_css=minimize_css('resources/custom.css'),
    posts=posts,
    pure_css=minimize_css('resources/pure-min.css'),
    time_generated=time_stamp
)
with open('for_publish/home.html', 'wb') as home_file:
    home_file.write(home_content)


# Generate post pages.

for post in posts:
    post_template = environment.get_template('post.html')
    post_content = post_template.render(
        custom_css=minimize_css('resources/custom.css'),
        post=post,
        pure_css=minimize_css('resources/pure-min.css'),
        time_generated=time_stamp
    )
    with open('for_publish/post_' + post.url, 'wb') as post_file:
        post_file.write(post_content)


# Generate portfolio page.

portfolio_template = environment.get_template('portfolio.html')
portfolio_content = portfolio_template.render(
    custom_css=minimize_css('resources/custom.css'),
    projects=projects,
    pure_css=minimize_css('resources/pure-min.css'),
    time_generated=time_stamp
)
with open('for_publish/portfolio.html', 'wb') as portfolio_file:
    portfolio_file.write(portfolio_content)


# Generate portfolio pages.

for project in projects:
    project_template = environment.get_template('project.html')
    project_content = project_template.render(
        custom_css=minimize_css('resources/custom.css'),
        project=project,
        pure_css=minimize_css('resources/pure-min.css'),
        time_generated=time_stamp
    )
    with open('for_publish/project_' + project.url, 'wb') as project_file:
        project_file.write(project_content)


# Generate about page.

about_template = environment.get_template('about.html')
about_content = about_template.render(
    custom_css=minimize_css('resources/custom.css'),
    pure_css=minimize_css('resources/pure-min.css'),
    time_generated=time_stamp
)
with open('for_publish/about.html', 'wb') as about_file:
    about_file.write(about_content)
