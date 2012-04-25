module ActionView
  module Template::Handlers
    class Ruby

      def self.call(template)
        source = template.source.empty? ? File.read(template.identifier) : template.source
        code = "begin\n#{source}\nend"
        code += '.to_json' if template.formats.include? :json
        code
      end

    end
  end
end

ActionView::Template.register_template_handler :rb, ActionView::Template::Handlers::Ruby
