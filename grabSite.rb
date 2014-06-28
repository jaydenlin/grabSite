require 'rubygems'
require 'nokogiri'
require 'open-uri'
require 'json'
require 'fileutils'

#config
configfile = 'config/config.json'
config = JSON.parse(File.read(configfile))
uri=config['uri']
name=config['name']
jsDomain="http://c.tw.rakuten-static.com/front/www/js/"
cssDomain="http://c.tw.rakuten-static.com/front/www/css/"
jsOutputPath="output/#{name}/js"
cssOutputPath="output/#{name}/css"
@projectOutputPath="output/#{name}"
@teamsiteConfig=Array.new



#get doc
doc = Nokogiri::HTML(open(uri))
#get images url
jsSrcList = doc.css("script").map {|element| element["src"]}
cssSrcList = doc.css("link").map {|element| element["href"]}

def createTestPage(uri,outputPath)
    doc=`curl #{uri}`
    localDoc=doc.to_s.gsub("http://c.tw.rakuten-static.com/front/www/js","js")
    localDoc=localDoc.to_s.gsub("http://c.tw.rakuten-static.com/front/www/css","css")
    FileUtils.mkdir_p("#{outputPath}")
    File.write("#{outputPath}/test.html",localDoc)
end


def downloadFiles(pathList,domain,outputPath)

pathList.each do |path|

    if path!=nil and path.include? domain 

       fileNameWithPath = path.gsub(domain,"")
       #parse name and path
       fileName = fileNameWithPath.split("/").last
       filePath = fileNameWithPath.gsub(fileName,"")

       if fileName.include? "?"
          cleanFileName=fileName.split("?").first
       else
          cleanFileName=fileName      
       end  

       #create dir
       FileUtils.mkdir_p("#{outputPath}/#{filePath}")

       #download file
       File.write("#{outputPath}/#{filePath}/#{cleanFileName}","")
       File.open("#{outputPath}/#{filePath}/#{cleanFileName}","wb") do |outputFile|
            begin
                outputFile.write  open(path).read 
            rescue OpenURI::HTTPError => ex
                puts "Handle 404 missing images here"
            end 
       end


       #save upload and submit path
       teamsitePath = Hash.new
       teamsitePath["path"]=filePath
       teamsitePath["filename"]=cleanFileName
       @teamsiteConfig.push(teamsitePath);


    end  

end

File.write("#{@projectOutputPath}/path.json",@teamsiteConfig.to_json)
end


downloadFiles(jsSrcList,jsDomain,jsOutputPath)
downloadFiles(cssSrcList,cssDomain,cssOutputPath)

createTestPage(uri,@projectOutputPath)
