module Kramdown
	module Converter
		class Html5 < Html
			def convert_p(el, indent)
			  if el.options[:transparent]
			    inner(el, indent)
			  # Check if the paragraph only contains an image and treat it as a figure instead.
			  elsif !el.children.nil? && el.children.count == 1 && el.children.first.type == :img
			    convert_figure(el.children.first, indent)
			  else
			    format_as_block_html(el.type, el.attr, inner(el, indent), indent)
			  end
			end

			def convert_figure(el, indent)
			  el.attr["class"] = "img-responsive" # Add a class for Bootstrap
			  "#{' '*indent}<figure><img#{html_attributes(el.attr)} />#{(el.attr['title'] ? "<figcaption>#{el.attr['title']}</figcaption>" : "")}</figure>\n"
			end
		end
	end
end

module Jekyll
  module Converters
    class Markdown
      class MyFancyMarkdown < KramdownParser

        # Override only the convert method to use my converter.
        def convert(content)
          Kramdown::Document.new(content, @config).to_html5
        end

      end
    end
  end
end