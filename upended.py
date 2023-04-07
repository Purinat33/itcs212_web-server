import re

# Open the Markdown file
with open('Documentation.md', 'r') as file:
    data = file.readlines()

# Find all the headers in the file
headers = []
for line in data:
    match = re.match(r'^(\#+)\s+(.*)$', line)
    if match:
        level = len(match.group(1))
        headers.append((level, match.group(2)))

# Generate the table of contents
table_of_contents = ''
for header in headers:
    level, name = header
    link = re.sub(r'[^a-zA-Z0-9]+', '-', name).lower()
    if level == 2:
        table_of_contents += f'* [{name}](#{link})\n'
    elif level == 3:
        table_of_contents += f'  * [{name}](#{link})\n'
    elif level == 4:
        table_of_contents += f'    * [{name}](#{link})\n'
    # add more elif blocks as needed for deeper levels
    else:
        pass

# Add the table of contents to the top of the file
new_data = table_of_contents + '\n' + ''.join(data)

# Write the updated Markdown file
with open('Documentation.md', 'w') as file:
    file.write(new_data)
