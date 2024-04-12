#! /usr/bin/env python

import os
import subprocess

import jinja2

HERE = os.path.abspath(os.path.dirname(__file__))
LAYOUT_ROOT = os.path.join(HERE, "layout")
CONTENTS_ROOT = os.path.join(HERE, "contents")
ROOT_PATH = "academy"
BUILD_DIR = os.path.join(HERE, "_build", ROOT_PATH)

RESOURCES = [
    # Resource template
    # {
    #     # mandatory
    #     "title": "My Title",
    #     "src": "filename or url",
    #     "description": "Will be trimmed to 3 lines",
    #     "type": "Tutorial/Guide/Video/Analysis",
    #     "category": "General/Development/DevOps/User experience",
    #     # optional
    #     "target_audience": [],
    #     "learning_outcomes": [],
    # },
    {
        "title": "Docker 101",
        "src": "docker101",
        "description": "Learn the basics of Docker and Docker Compose in this general, beginner-level tutorial.",
        "type": "Tutorial",
        "category": "Development",
    },
    {
        "title": "What is Tutor?",
        "src": "what-is-tutor",
        "description": "Why does Tutor exist and how does it work?",
        "type": "Video",
        "category": "General",
    },
    {
        "title": "Install Open edX with Tutor",
        "src": "openedx-install",
        "description": "Step-by-step instructions for an installation from scratch on a production server. The last guide you will ever need to install Open edX.",
        "type": "Video",
        "category": "Devops",
    },
    {
        "title": "Tutor plugins",
        "src": "tutor-plugins",
        "description": "Learn what Tutor plugins are, how to use them and how to create your own plugins.",
        "type": "Guide",
        "category": "Devops",
    },
    {
        "title": "Changing the appearance of Open edX",
        "src": "https://docs.tutor.edly.io/tutorials/theming.html",
        "type": "Tutorial",
        "description": "Customize the visual appearance of your Open edX platform with comprehensive theming.",
        "category": "UI/UX",
    },
    {
        "title": "Running Open edX at scale",
        "src": "https://docs.tutor.edly.io/tutorials/scale.html",
        "type": "Guide",
        "description": "What happens when your monthly active users are multiplied by 10, 100, 1000? Follow this short guide to find out.",
        "category": "Devops",
    },
    {
        "title": "Open edX installation speedrun",
        "src": "https://www.youtube.com/watch?v=eXPFx_h1hn4",
        "type": "Video",
        "description": "How fast can we install Open edX on a live production server? Watch this video to find out :)",
        "category": "Devops",
    },
    {
        "title": "Reaching 50k concurrent users on Open edX with Oracle Cloud",
        "src": "project-50k",
        "description": "Read all about this achievement in this interview of the Edly DevOps team.",
        "type": "Analysis",
        "category": "DevOps",
    },
]

VARIABLES = {
    "URL_ROOT": f"/{ROOT_PATH}",
    "CATEGORIES": ["all"] + list(sorted(set(r["category"] for r in RESOURCES))),
    "RESOURCE_TYPES": ["all"] + list(sorted(set(r["type"] for r in RESOURCES))),
}


def main():
    environment = jinja2.Environment(
        loader=jinja2.FileSystemLoader([LAYOUT_ROOT]),
        undefined=jinja2.StrictUndefined,
    )
    build_content_docs()
    render_site(environment)


def build_content_docs():
    for resource in RESOURCES:
        src = resource["src"]
        if src and not resource["src"].startswith("http"):
            src_path = os.path.join(CONTENTS_ROOT, f"{resource['src']}.rst")
            dst_path = os.path.join(CONTENTS_ROOT, "_build", f"{resource['src']}.html")
            ensure_file_directory_exists(dst_path)
            print(f"Converting {src_path} -> {dst_path}...")
            subprocess.check_call(
                ["pandoc", "--shift-heading-level-by=2", src_path, "-o", dst_path]
            )


def render_site(environment):
    render_to(environment, "index.html", "index.html", resources=RESOURCES)
    for resource in RESOURCES:
        src = resource["src"]
        if src and not src.startswith("http"):
            with open(
                os.path.join(CONTENTS_ROOT, "_build", f"{src}.html"),
                encoding="utf8",
            ) as f:
                resource_html = f.read()
            render_to(
                environment,
                "resource.html",
                os.path.join(src, "index.html"),
                resource=resource,
                resource_html=resource_html,
            )


def render_to(environment, template_path, dst_path, **local_variables):
    print(f"rendering {template_path} --> {dst_path}...")
    template = environment.get_template(template_path)
    dst_abs_path = os.path.join(BUILD_DIR, dst_path)
    ensure_file_directory_exists(dst_abs_path)
    with open(dst_abs_path, "w", encoding="utf8") as f:
        f.write(template.render(**VARIABLES, **local_variables))


def ensure_file_directory_exists(path):
    dirname = os.path.dirname(path)
    if not os.path.exists(dirname):
        os.makedirs(dirname)


if __name__ == "__main__":
    main()
