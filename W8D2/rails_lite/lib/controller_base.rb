require 'active_support'
require 'active_support/core_ext'
require 'erb'
require_relative './session'
require 'byebug'

class ControllerBase
  attr_reader :req, :res, :params

  # Setup the controller
  def initialize(req, res, route_params = {})
    @params = req.params.merge(route_params)
    @req = req
    @res = res
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    @already_built_response
  end

  # Set the response status code and header
  def redirect_to(url)
    @res.status = 302
    @res['Location'] = url
    raise "Double render error" if already_built_response?
    @already_built_response = true
    session.store_session(@res)
    nil
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    @res.write(content)
    @res['Content-Type'] = content_type
    raise "Double render error" if already_built_response?
    @already_built_response = true
    session.store_session(@res)
    nil
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
    dir_path = File.dirname(File.expand_path('..',__FILE__))
    template_path = File.join(dir_path, 'views', self.class.to_s.underscore,"#{template_name}.html.erb")
    template_code = File.read(template_path)
    content = ERB.new(template_code).result(binding)
    render_content(content, 'text/html')
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(@req)
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
    self.send(name)
    render(name) unless already_built_response?
  end
end

