from django import template
from wagtail.wagtailcore.models import Page
try:
    # Python 3
    from urllib.parse import unquote_plus
except ImportError:
    # Python 2
    from urllib import unquote_plus

register = template.Library()


@register.inclusion_tag('wagtailerrorpages/fragments/404message.html', takes_context=True)
def message404(context):
    url_path = context['request'].path_info
    search_query = unquote_plus(url_path).replace('/', ' ')
    search_results = Page.objects.live().search(search_query)

    return {
        'search_query': search_query,
        'search_results': search_results,
    }
