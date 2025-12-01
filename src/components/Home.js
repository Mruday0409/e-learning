import React, { useState } from 'react';
import './Home.css';
import VideoLessonsPopup from './VideoLessonsPopup';
import PopupCard, { RadioOption } from './PopupCard';
import VideoPlayer from './VideoPlayer';
import jsPDF from 'jspdf';
import { 
  BookOpen, Video, FileText, ClipboardList, Lightbulb, Sparkles, ArrowRight,
  HelpCircle, Calendar, BarChart3, Award, Users, BookMarked,
  Star, Layers, ScrollText, FileCheck
} from 'lucide-react';

function Home() {
  // All existing state variables
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState('');
  const [showClassSelection, setShowClassSelection] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [showSubjectSelection, setShowSubjectSelection] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showChapterSelection, setShowChapterSelection] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [showPdfVideoSelection, setShowPdfVideoSelection] = useState(false);
  const [selectedChapterOption, setSelectedChapterOption] = useState('');
  const [isLoadingChapter, setIsLoadingChapter] = useState(false);
  const [loadingChapterType, setLoadingChapterType] = useState('');
  const [chapterSelectionSource, setChapterSelectionSource] = useState('main');
  const [showVideoLessons, setShowVideoLessons] = useState(false);
  const [selectedVideoOption, setSelectedVideoOption] = useState('');
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showVideoLessonsClassSelection, setShowVideoLessonsClassSelection] = useState(false);
  const [selectedVideoLessonsClass, setSelectedVideoLessonsClass] = useState('');
  const [showVideoLessonsSubjectSelection, setShowVideoLessonsSubjectSelection] = useState(false);
  const [selectedVideoLessonsSubject, setSelectedVideoLessonsSubject] = useState('');
  const [isLoadingVideoLessonsSubject, setIsLoadingVideoLessonsSubject] = useState(false);
  const [showRevisionNotes, setShowRevisionNotes] = useState(false);
  const [selectedRevisionOption, setSelectedRevisionOption] = useState('');
  const [showRevisionClassSelection, setShowRevisionClassSelection] = useState(false);
  const [selectedRevisionClass, setSelectedRevisionClass] = useState('');
  const [showRevisionSubjectSelection, setShowRevisionSubjectSelection] = useState(false);
  const [selectedRevisionSubject, setSelectedRevisionSubject] = useState('');
  const [isLoadingRevisionSubject, setIsLoadingRevisionSubject] = useState(false);
  const [showModelPapers, setShowModelPapers] = useState(false);
  const [selectedPaperOption, setSelectedPaperOption] = useState('');
  const [showModelPapersClassSelection, setShowModelPapersClassSelection] = useState(false);
  const [selectedModelPapersClass, setSelectedModelPapersClass] = useState('');
  const [showModelPapersSubjectSelection, setShowModelPapersSubjectSelection] = useState(false);
  const [selectedModelPapersSubject, setSelectedModelPapersSubject] = useState('');
  const [isLoadingModelPapersSubject, setIsLoadingModelPapersSubject] = useState(false);
  const [showConceptZone, setShowConceptZone] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState('');
  const [showConceptZoneClassSelection, setShowConceptZoneClassSelection] = useState(false);
  const [selectedConceptZoneClass, setSelectedConceptZoneClass] = useState('');
  const [showConceptZoneSubjectSelection, setShowConceptZoneSubjectSelection] = useState(false);
  const [selectedConceptZoneSubject, setSelectedConceptZoneSubject] = useState('');
  const [hoveredConceptClass, setHoveredConceptClass] = useState(null);
  const [hoveredConceptSubject, setHoveredConceptSubject] = useState(null);
  const [hoveredClass, setHoveredClass] = useState(null);
  const [hoveredSubject, setHoveredSubject] = useState(null);
  const [hoveredChapter, setHoveredChapter] = useState(null);
  const [hoveredPdfVideo, setHoveredPdfVideo] = useState(null);
  const [hoveredVideoClass, setHoveredVideoClass] = useState(null);
  const [hoveredVideoSubject, setHoveredVideoSubject] = useState(null);
  const [hoveredRevisionOption, setHoveredRevisionOption] = useState(null);
  const [hoveredRevisionClass, setHoveredRevisionClass] = useState(null);
  const [hoveredRevisionSubject, setHoveredRevisionSubject] = useState(null);
  const [hoveredPaperOption, setHoveredPaperOption] = useState(null);
  const [hoveredPaperClass, setHoveredPaperClass] = useState(null);
  const [hoveredPaperSubject, setHoveredPaperSubject] = useState(null);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  // Video URL - HLS format (using test stream like in the provided code)
  const videoSource = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  // All existing handlers (keeping them all for popup functionality)
  const handleNavClick = (e, title) => {
    e.preventDefault();
    setComingSoonTitle(title);
    setShowComingSoon(true);
  };

  const closeComingSoon = () => {
    setShowComingSoon(false);
  };

  const handleTextbookClick = () => {
    setSelectedClass('');
    setSelectedSubject('');
    setSelectedChapterOption('');
    setShowSubjectSelection(false);
    setShowChapterSelection(false);
    setShowClassSelection(true);
  };

  const closeClassSelection = () => {
    setShowClassSelection(false);
    setShowSubjectSelection(false);
    setShowChapterSelection(false);
    setSelectedClass('');
    setSelectedSubject('');
    setSelectedChapterOption('');
  };

  const handleClassSelect = (classOption) => {
    setSelectedClass(classOption);
  };

  const handleClassContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedClass) {
      setShowClassSelection(false);
        setShowSubjectSelection(true);
    }
  };

  const closeSubjectSelection = () => {
    setShowSubjectSelection(false);
    setShowChapterSelection(false);
    setSelectedSubject('');
    setSelectedChapterOption('');
  };

  const handleSubjectBack = () => {
    setShowSubjectSelection(false);
    setShowClassSelection(true);
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setChapterSelectionSource('main');
  };

  const handleSubjectContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedSubject && selectedClass) {
      setShowSubjectSelection(false);
        setShowChapterSelection(true);
    }
  };

  const closeChapterSelection = () => {
    setShowChapterSelection(false);
    setShowPdfVideoSelection(false);
    setShowSubjectSelection(false);
    setShowClassSelection(false);
    setSelectedChapter('');
    setSelectedChapterOption('');
    setSelectedSubject('');
    setSelectedClass('');
    setIsLoadingChapter(false);
    setLoadingChapterType('');
  };

  const handleChapterBack = () => {
    if (showPdfVideoSelection) {
      // If we're in PDF/Video selection, go back to chapter selection
      setShowPdfVideoSelection(false);
      setShowChapterSelection(true);
    } else {
      // If we're in chapter selection, go back to subject selection
    setShowChapterSelection(false);
    if (chapterSelectionSource === 'video') {
      setShowVideoLessonsSubjectSelection(true);
    } else if (chapterSelectionSource === 'revision') {
      setShowRevisionSubjectSelection(true);
    } else if (chapterSelectionSource === 'model') {
      setShowModelPapersSubjectSelection(true);
    } else if (chapterSelectionSource === 'concept') {
      setShowConceptZoneSubjectSelection(true);
    } else {
      setShowSubjectSelection(true);
      }
    }
  };

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
  };

  const handleChapterContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedChapter) {
      setShowChapterSelection(false);
      setShowPdfVideoSelection(true);
    }
  };

  const downloadEShalaPDF = () => {
    const pdf = new jsPDF();
    pdf.setFont('helvetica');
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Welcome to E-Shala', 105, 20, { align: 'center' });
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    const content = [
      'Welcome to E-Shala, a modern digital learning platform created to make',
      'education simple, accessible, and engaging for every student.',
    ];
    let yPosition = 40;
    content.forEach((line) => {
        pdf.text(line, 105, yPosition, { align: 'center' });
      yPosition += 7;
    });
    pdf.save('E-Shala-Welcome.pdf');
  };

  const handleChapterOptionSelect = (option) => {
    setSelectedChapterOption(option);
    if (option === 'pdf') {
      downloadEShalaPDF();
      setIsLoadingChapter(false);
      setShowPdfVideoSelection(false);
    } else if (option === 'video') {
    setIsLoadingChapter(true);
    setLoadingChapterType(option);
    setTimeout(() => {
      setIsLoadingChapter(false);
        setShowPdfVideoSelection(false);
        setShowVideoPlayer(true);
      }, 2000);
    }
  };

  const handleVideoLessonsClick = () => {
    setSelectedVideoOption('');
    setSelectedVideoLessonsClass('');
    setSelectedVideoLessonsSubject('');
    setShowVideoLessons(true);
    setShowVideoLessonsClassSelection(false);
    setShowVideoLessonsSubjectSelection(false);
  };

  const closeVideoLessons = () => {
    setShowVideoLessons(false);
    setShowVideoLessonsClassSelection(false);
    setShowVideoLessonsSubjectSelection(false);
    setSelectedVideoOption('');
    setSelectedVideoLessonsClass('');
    setSelectedVideoLessonsSubject('');
  };

  const handleVideoOptionSelect = (item) => {
    const optionMap = {
      'Key Points': 'keypoints',
      'Flashcards': 'flashcards',
      'Summaries': 'summaries'
    };
    setSelectedVideoOption(optionMap[item.label]);
      setShowVideoLessons(false);
        setShowVideoLessonsClassSelection(true);
  };

  const handleVideoUnlockAccess = () => {
    console.log('Unlock Access clicked');
  };

  const handleVideoLessonsClassSelect = (classOption) => {
    setSelectedVideoLessonsClass(classOption);
  };

  const handleVideoLessonsClassContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedVideoLessonsClass) {
      setShowVideoLessonsClassSelection(false);
        setShowVideoLessonsSubjectSelection(true);
    }
  };

  const handleVideoLessonsSubjectSelect = (subject) => {
    setSelectedVideoLessonsSubject(subject);
    setSelectedSubject(subject);
    setSelectedClass(selectedVideoLessonsClass);
    setChapterSelectionSource('video');
  };

  const handleVideoLessonsSubjectContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedVideoLessonsSubject && selectedVideoLessonsClass) {
    setShowVideoLessonsSubjectSelection(false);
    setShowChapterSelection(true);
    }
  };

  const handleRevisionNotesClick = () => {
    setSelectedRevisionClass('');
    setSelectedRevisionSubject('');
    setSelectedRevisionOption('');
    setShowRevisionClassSelection(false);
    setShowRevisionSubjectSelection(false);
    setShowRevisionNotes(true);
  };

  const closeRevisionNotes = () => {
    setShowRevisionNotes(false);
    setShowRevisionClassSelection(false);
    setShowRevisionSubjectSelection(false);
    setSelectedRevisionOption('');
    setSelectedRevisionClass('');
    setSelectedRevisionSubject('');
  };

  const handleRevisionOptionSelect = (option) => {
    setSelectedRevisionOption(option);
  };

  const handleRevisionOptionContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedRevisionOption) {
      setShowRevisionNotes(false);
        setShowRevisionClassSelection(true);
    }
  };

  const handleRevisionClassSelect = (classOption) => {
    setSelectedRevisionClass(classOption);
  };

  const handleRevisionClassContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedRevisionClass) {
      setShowRevisionClassSelection(false);
        setShowRevisionSubjectSelection(true);
    }
  };

  const handleRevisionSubjectBack = () => {
    setShowRevisionSubjectSelection(false);
    setShowRevisionClassSelection(true);
  };

  const handleRevisionSubjectSelect = (subject) => {
    setSelectedRevisionSubject(subject);
    setSelectedSubject(subject);
    setSelectedClass(selectedRevisionClass);
    setChapterSelectionSource('revision');
  };

  const handleRevisionSubjectContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedRevisionSubject && selectedRevisionClass) {
    setShowRevisionSubjectSelection(false);
    setShowChapterSelection(true);
    }
  };

  const handleModelPapersClick = () => {
    setSelectedPaperOption('');
    setSelectedModelPapersClass('');
    setSelectedModelPapersSubject('');
    setShowModelPapersClassSelection(false);
    setShowModelPapersSubjectSelection(false);
    setShowModelPapers(true);
  };

  const closeModelPapers = () => {
    setShowModelPapers(false);
    setShowModelPapersClassSelection(false);
    setShowModelPapersSubjectSelection(false);
    setSelectedPaperOption('');
    setSelectedModelPapersClass('');
    setSelectedModelPapersSubject('');
  };

  const handlePaperOptionSelect = (option) => {
    setSelectedPaperOption(option);
  };

  const handlePaperOptionContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedPaperOption) {
      setShowModelPapers(false);
        setShowModelPapersClassSelection(true);
    }
  };

  const handleModelPapersClassSelect = (classOption) => {
    setSelectedModelPapersClass(classOption);
  };

  const handleModelPapersClassContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedModelPapersClass) {
      setShowModelPapersClassSelection(false);
        setShowModelPapersSubjectSelection(true);
    }
  };

  const handleModelPapersSubjectBack = () => {
    setShowModelPapersSubjectSelection(false);
    setShowModelPapersClassSelection(true);
  };

  const handleModelPapersSubjectSelect = (subject) => {
    setSelectedModelPapersSubject(subject);
    setSelectedSubject(subject);
    setSelectedClass(selectedModelPapersClass);
    setChapterSelectionSource('model');
  };

  const handleModelPapersSubjectContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedModelPapersSubject && selectedModelPapersClass) {
    setShowModelPapersSubjectSelection(false);
    setShowChapterSelection(true);
    }
  };

  const handleConceptZoneClick = () => {
    setSelectedConcept('');
    setSelectedConceptZoneClass('');
    setSelectedConceptZoneSubject('');
    setShowConceptZoneClassSelection(false);
    setShowConceptZoneSubjectSelection(false);
    setShowConceptZone(true);
  };

  const closeConceptZone = () => {
    setShowConceptZone(false);
    setShowConceptZoneClassSelection(false);
    setShowConceptZoneSubjectSelection(false);
    setSelectedConcept('');
    setSelectedConceptZoneClass('');
    setSelectedConceptZoneSubject('');
  };

  const handleConceptSelect = (concept) => {
    setSelectedConcept(concept);
  };

  const handleConceptContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedConcept) {
      setShowConceptZone(false);
      setShowConceptZoneClassSelection(true);
    }
  };

  const handleConceptZoneClassSelect = (classOption) => {
    setSelectedConceptZoneClass(classOption);
  };

  const handleConceptZoneClassContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedConceptZoneClass) {
      setShowConceptZoneClassSelection(false);
      setShowConceptZoneSubjectSelection(true);
    }
  };

  const handleConceptZoneClassBack = () => {
    setShowConceptZoneClassSelection(false);
    setShowConceptZone(true);
  };

  const handleConceptZoneSubjectSelect = (subject) => {
    setSelectedConceptZoneSubject(subject);
    setSelectedSubject(subject);
    setSelectedClass(selectedConceptZoneClass);
    setChapterSelectionSource('concept');
  };

  const handleConceptZoneSubjectContinue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedConceptZoneSubject && selectedConceptZoneClass) {
    setShowConceptZoneSubjectSelection(false);
      setShowChapterSelection(true);
    }
  };

  const closeVideoPlayer = () => {
    setShowVideoPlayer(false);
  };

  // Helper function to get the correct video title based on the flow
  const getVideoTitle = () => {
    let subject = '';
    let classValue = '';

    // Determine subject and class based on the source
    if (chapterSelectionSource === 'video') {
      subject = selectedVideoLessonsSubject;
      classValue = selectedVideoLessonsClass;
    } else if (chapterSelectionSource === 'revision') {
      subject = selectedRevisionSubject;
      classValue = selectedRevisionClass;
    } else if (chapterSelectionSource === 'model') {
      subject = selectedModelPapersSubject;
      classValue = selectedModelPapersClass;
    } else if (chapterSelectionSource === 'concept') {
      subject = selectedConceptZoneSubject;
      classValue = selectedConceptZoneClass;
    } else {
      // Main flow (Textbooks)
      subject = selectedSubject;
      classValue = selectedClass;
    }

    // Format subject name
    const subjectName = subject === 'maths' ? 'Maths' : 
                       subject === 'science' ? 'Science' : 
                       subject === 'social' ? 'Social' : 
                       subject === 'english' ? 'English' : 
                       subject === 'kannada' ? 'Kannada' : '';

    // Return formatted title
    if (subjectName && classValue) {
      return `${subjectName} - ${classValue} Standard`;
    } else if (subjectName) {
      return `${subjectName} - Demo Lesson`;
    } else if (classValue) {
      return `${classValue} Standard - Demo Lesson`;
    }
    return 'Demo Lesson';
  };

  return (
    <div>
      {/* All existing popups - keeping them all */}
      {showComingSoon && (
        <PopupCard
          onClose={closeComingSoon}
          title={comingSoonTitle}
          icon="🚀"
          customContent={
            <div>
              <div className="popup-card-coming-soon-text">
                <span className="popup-card-coming-soon-main">Coming Soon</span>
                <p className="popup-card-coming-soon-subtitle">We're working hard to bring you something amazing!</p>
              </div>
            </div>
          }
        />
      )}

      {/* Class Selection Modal */}
      {showClassSelection && (
        <PopupCard
          onClose={closeClassSelection}
          title="Class Selection"
          icon="📚"
        >
          <div className="popup-card-items">
            <RadioOption
                    value="8th"
                    checked={selectedClass === '8th'}
                    onChange={() => handleClassSelect('8th')}
              label="8th Standard"
              emoji="🎒"
              hovered={hoveredClass === '8th'}
              onMouseEnter={() => setHoveredClass('8th')}
              onMouseLeave={() => setHoveredClass(null)}
            />
            <RadioOption
                    value="9th"
                    checked={selectedClass === '9th'}
                    onChange={() => handleClassSelect('9th')}
              label="9th Standard"
              emoji="📖"
              hovered={hoveredClass === '9th'}
              onMouseEnter={() => setHoveredClass('9th')}
              onMouseLeave={() => setHoveredClass(null)}
            />
            <RadioOption
                    value="10th"
                    checked={selectedClass === '10th'}
                    onChange={() => handleClassSelect('10th')}
              label="10th Standard"
              emoji="🎓"
              hovered={hoveredClass === '10th'}
              onMouseEnter={() => setHoveredClass('10th')}
              onMouseLeave={() => setHoveredClass(null)}
                  />
              </div>
              {selectedClass && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Great choice! 🎉</p>
                </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={handleClassContinue}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Continue</span>
            </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* Subject Selection Modal */}
      {showSubjectSelection && (
        <PopupCard
          onClose={closeSubjectSelection}
          onBack={handleSubjectBack}
          title="Subject Selection"
          icon="📚"
          badge={`${selectedClass} Standard`}
        >
          <div className="popup-card-items">
            <RadioOption
                    value="maths"
                    checked={selectedSubject === 'maths'}
                    onChange={() => handleSubjectSelect('maths')}
              label="Maths"
              emoji="🔢"
              hovered={hoveredSubject === 'maths'}
              onMouseEnter={() => setHoveredSubject('maths')}
              onMouseLeave={() => setHoveredSubject(null)}
            />
            <RadioOption
                    value="science"
                    checked={selectedSubject === 'science'}
                    onChange={() => handleSubjectSelect('science')}
              label="Science"
              emoji="🔬"
              hovered={hoveredSubject === 'science'}
              onMouseEnter={() => setHoveredSubject('science')}
              onMouseLeave={() => setHoveredSubject(null)}
            />
            <RadioOption
                    value="social"
                    checked={selectedSubject === 'social'}
                    onChange={() => handleSubjectSelect('social')}
              label="Social"
              emoji="🌍"
              hovered={hoveredSubject === 'social'}
              onMouseEnter={() => setHoveredSubject('social')}
              onMouseLeave={() => setHoveredSubject(null)}
            />
            <RadioOption
                    value="english"
                    checked={selectedSubject === 'english'}
                    onChange={() => handleSubjectSelect('english')}
              label="English"
              emoji="📖"
              hovered={hoveredSubject === 'english'}
              onMouseEnter={() => setHoveredSubject('english')}
              onMouseLeave={() => setHoveredSubject(null)}
            />
            <RadioOption
                    value="kannada"
                    checked={selectedSubject === 'kannada'}
                    onChange={() => handleSubjectSelect('kannada')}
              label="Kannada"
              emoji="📝"
              hovered={hoveredSubject === 'kannada'}
              onMouseEnter={() => setHoveredSubject('kannada')}
              onMouseLeave={() => setHoveredSubject(null)}
                  />
              </div>
              {selectedSubject && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Great choice! 🎉</p>
                </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={handleSubjectContinue}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Continue</span>
            </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* Chapter Selection Modal */}
      {showChapterSelection && (
        <PopupCard
          onClose={closeChapterSelection}
          onBack={handleChapterBack}
          title="Chapter Selection"
          icon="📚"
          badge={`${selectedSubject === 'maths' ? 'Maths' : selectedSubject === 'science' ? 'Science' : selectedSubject === 'social' ? 'Social' : selectedSubject === 'english' ? 'English' : 'Kannada'} - ${selectedClass} Standard`}
        >
          <div className="popup-card-items">
            <RadioOption
              value="chapter1"
              checked={selectedChapter === 'chapter1'}
              onChange={() => handleChapterSelect('chapter1')}
              label="Chapter 1"
              emoji="📖"
              hovered={hoveredChapter === 'chapter1'}
              onMouseEnter={() => setHoveredChapter('chapter1')}
              onMouseLeave={() => setHoveredChapter(null)}
            />
            <RadioOption
              value="chapter2"
              checked={selectedChapter === 'chapter2'}
              onChange={() => handleChapterSelect('chapter2')}
              label="Chapter 2"
              emoji="📖"
              hovered={hoveredChapter === 'chapter2'}
              onMouseEnter={() => setHoveredChapter('chapter2')}
              onMouseLeave={() => setHoveredChapter(null)}
            />
            <RadioOption
              value="chapter3"
              checked={selectedChapter === 'chapter3'}
              onChange={() => handleChapterSelect('chapter3')}
              label="Chapter 3"
              emoji="📖"
              hovered={hoveredChapter === 'chapter3'}
              onMouseEnter={() => setHoveredChapter('chapter3')}
              onMouseLeave={() => setHoveredChapter(null)}
            />
            <RadioOption
              value="chapter4"
              checked={selectedChapter === 'chapter4'}
              onChange={() => handleChapterSelect('chapter4')}
              label="Chapter 4"
              emoji="📖"
              hovered={hoveredChapter === 'chapter4'}
              onMouseEnter={() => setHoveredChapter('chapter4')}
              onMouseLeave={() => setHoveredChapter(null)}
            />
            <RadioOption
              value="chapter5"
              checked={selectedChapter === 'chapter5'}
              onChange={() => handleChapterSelect('chapter5')}
              label="Chapter 5"
              emoji="📖"
              hovered={hoveredChapter === 'chapter5'}
              onMouseEnter={() => setHoveredChapter('chapter5')}
              onMouseLeave={() => setHoveredChapter(null)}
            />
          </div>
          {selectedChapter && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Great choice! 🎉</p>
              </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={handleChapterContinue}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Continue</span>
                </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* PDF/Video Selection Modal */}
      {showPdfVideoSelection && (
        <PopupCard
          onClose={closeChapterSelection}
          onBack={handleChapterBack}
          title="Choose Format"
          icon="📚"
          badge={`${selectedChapter.replace('chapter', 'Chapter ')} - ${selectedSubject === 'maths' ? 'Maths' : selectedSubject === 'science' ? 'Science' : selectedSubject === 'social' ? 'Social' : selectedSubject === 'english' ? 'English' : 'Kannada'}`}
          isLoading={isLoadingChapter}
          loadingText={loadingChapterType === 'pdf' ? '📄 PDF is loading...' : '🎥 Video is loading...'}
        >
          <div className="popup-card-items">
            <RadioOption
                    value="pdf"
                    checked={selectedChapterOption === 'pdf'}
                    onChange={() => handleChapterOptionSelect('pdf')}
              label="PDF (Free)"
              emoji="📄"
              hovered={hoveredPdfVideo === 'pdf'}
              onMouseEnter={() => setHoveredPdfVideo('pdf')}
              onMouseLeave={() => setHoveredPdfVideo(null)}
            />
            <RadioOption
                    value="video"
                    checked={selectedChapterOption === 'video'}
                    onChange={() => handleChapterOptionSelect('video')}
              label="Video (Premium)"
              emoji="🎥"
              hovered={hoveredPdfVideo === 'video'}
              onMouseEnter={() => setHoveredPdfVideo('video')}
              onMouseLeave={() => setHoveredPdfVideo(null)}
                  />
              </div>
              {selectedChapterOption && !isLoadingChapter && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Perfect! Ready to learn! 🎓✨</p>
                </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={closeChapterSelection}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Start Learning</span>
            </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* Video Lessons Popup */}
      {showVideoLessons && (
        <VideoLessonsPopup
          onClose={closeVideoLessons}
          onItemSelect={handleVideoOptionSelect}
          onUnlockAccess={handleVideoUnlockAccess}
        />
      )}

      {/* Revision Notes Popup */}
      {showRevisionNotes && (
        <PopupCard
          onClose={closeRevisionNotes}
          title="Revision Notes"
          icon="📝"
        >
          <div className="popup-card-items">
            <RadioOption
                    value="keypoints"
                    checked={selectedRevisionOption === 'keypoints'}
                    onChange={() => handleRevisionOptionSelect('keypoints')}
              label="Key Points"
              emoji="⭐"
              hovered={hoveredRevisionOption === 'keypoints'}
              onMouseEnter={() => setHoveredRevisionOption('keypoints')}
              onMouseLeave={() => setHoveredRevisionOption(null)}
            />
            <RadioOption
                    value="flashcards"
                    checked={selectedRevisionOption === 'flashcards'}
                    onChange={() => handleRevisionOptionSelect('flashcards')}
              label="Flashcards"
              emoji="🃏"
              hovered={hoveredRevisionOption === 'flashcards'}
              onMouseEnter={() => setHoveredRevisionOption('flashcards')}
              onMouseLeave={() => setHoveredRevisionOption(null)}
            />
            <RadioOption
                    value="summaries"
                    checked={selectedRevisionOption === 'summaries'}
                    onChange={() => handleRevisionOptionSelect('summaries')}
              label="Summaries"
              emoji="📋"
              hovered={hoveredRevisionOption === 'summaries'}
              onMouseEnter={() => setHoveredRevisionOption('summaries')}
              onMouseLeave={() => setHoveredRevisionOption(null)}
                  />
              </div>
              {selectedRevisionOption && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Great choice! 🎉</p>
                </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={handleRevisionOptionContinue}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Continue</span>
            </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* Model Papers Popup */}
      {showModelPapers && (
        <PopupCard
          onClose={closeModelPapers}
          title="Model Papers"
          icon="📄"
        >
          <div className="popup-card-items">
            <RadioOption
              value="pastpapers"
              checked={selectedPaperOption === 'pastpapers'}
              onChange={() => handlePaperOptionSelect('pastpapers')}
              label="Past Papers"
              emoji="📜"
              hovered={hoveredPaperOption === 'pastpapers'}
              onMouseEnter={() => setHoveredPaperOption('pastpapers')}
              onMouseLeave={() => setHoveredPaperOption(null)}
            />
            <RadioOption
              value="practicesets"
              checked={selectedPaperOption === 'practicesets'}
              onChange={() => handlePaperOptionSelect('practicesets')}
              label="Practice Sets"
              emoji="✏️"
              hovered={hoveredPaperOption === 'practicesets'}
              onMouseEnter={() => setHoveredPaperOption('practicesets')}
              onMouseLeave={() => setHoveredPaperOption(null)}
                  />
              </div>
          {selectedPaperOption && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Great choice! 🎉</p>
                </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={handlePaperOptionContinue}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Continue</span>
            </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* Video Lessons Class Selection */}
      {showVideoLessonsClassSelection && (
        <PopupCard
          onClose={closeVideoLessons}
          title="Class Selection"
          icon="🎥"
          badge={`Premium - ${selectedVideoOption === 'keypoints' ? 'Key Points' : selectedVideoOption === 'flashcards' ? 'Flashcards' : 'Summaries'}`}
        >
          <div className="popup-card-items">
            <RadioOption
                    value="8th"
                    checked={selectedVideoLessonsClass === '8th'}
                    onChange={() => handleVideoLessonsClassSelect('8th')}
              label="8th Standard"
              emoji="🎒"
              hovered={hoveredVideoClass === '8th'}
              onMouseEnter={() => setHoveredVideoClass('8th')}
              onMouseLeave={() => setHoveredVideoClass(null)}
            />
            <RadioOption
                    value="9th"
                    checked={selectedVideoLessonsClass === '9th'}
                    onChange={() => handleVideoLessonsClassSelect('9th')}
              label="9th Standard"
              emoji="📖"
              hovered={hoveredVideoClass === '9th'}
              onMouseEnter={() => setHoveredVideoClass('9th')}
              onMouseLeave={() => setHoveredVideoClass(null)}
            />
            <RadioOption
                    value="10th"
                    checked={selectedVideoLessonsClass === '10th'}
                    onChange={() => handleVideoLessonsClassSelect('10th')}
              label="10th Standard"
              emoji="🎓"
              hovered={hoveredVideoClass === '10th'}
              onMouseEnter={() => setHoveredVideoClass('10th')}
              onMouseLeave={() => setHoveredVideoClass(null)}
                  />
              </div>
              {selectedVideoLessonsClass && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Great choice! 🎉</p>
                </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={handleVideoLessonsClassContinue}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Continue</span>
            </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* Video Lessons Subject Selection */}
      {showVideoLessonsSubjectSelection && (
        <PopupCard
          onClose={closeVideoLessons}
          onBack={() => {
            setShowVideoLessonsSubjectSelection(false);
            setShowVideoLessonsClassSelection(true);
          }}
          title="Subject Selection"
          icon="🎥"
          badge={`${selectedVideoLessonsClass} Standard - ${selectedVideoOption === 'keypoints' ? 'Key Points' : selectedVideoOption === 'flashcards' ? 'Flashcards' : 'Summaries'}`}
        >
          <div className="popup-card-items">
            <RadioOption
                    value="maths"
                    checked={selectedVideoLessonsSubject === 'maths'}
                    onChange={() => handleVideoLessonsSubjectSelect('maths')}
              label="Maths"
              emoji="🔢"
              hovered={hoveredVideoSubject === 'maths'}
              onMouseEnter={() => setHoveredVideoSubject('maths')}
              onMouseLeave={() => setHoveredVideoSubject(null)}
            />
            <RadioOption
                    value="science"
                    checked={selectedVideoLessonsSubject === 'science'}
                    onChange={() => handleVideoLessonsSubjectSelect('science')}
              label="Science"
              emoji="🔬"
              hovered={hoveredVideoSubject === 'science'}
              onMouseEnter={() => setHoveredVideoSubject('science')}
              onMouseLeave={() => setHoveredVideoSubject(null)}
            />
            <RadioOption
                    value="social"
                    checked={selectedVideoLessonsSubject === 'social'}
                    onChange={() => handleVideoLessonsSubjectSelect('social')}
              label="Social"
              emoji="🌍"
              hovered={hoveredVideoSubject === 'social'}
              onMouseEnter={() => setHoveredVideoSubject('social')}
              onMouseLeave={() => setHoveredVideoSubject(null)}
            />
            <RadioOption
                    value="english"
                    checked={selectedVideoLessonsSubject === 'english'}
                    onChange={() => handleVideoLessonsSubjectSelect('english')}
              label="English"
              emoji="📖"
              hovered={hoveredVideoSubject === 'english'}
              onMouseEnter={() => setHoveredVideoSubject('english')}
              onMouseLeave={() => setHoveredVideoSubject(null)}
            />
            <RadioOption
                    value="kannada"
                    checked={selectedVideoLessonsSubject === 'kannada'}
                    onChange={() => handleVideoLessonsSubjectSelect('kannada')}
              label="Kannada"
              emoji="📝"
              hovered={hoveredVideoSubject === 'kannada'}
              onMouseEnter={() => setHoveredVideoSubject('kannada')}
              onMouseLeave={() => setHoveredVideoSubject(null)}
                  />
              </div>
          {selectedVideoLessonsSubject && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Great choice! 🎉</p>
                </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={handleVideoLessonsSubjectContinue}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Continue</span>
            </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* Revision Notes Class Selection */}
      {showRevisionClassSelection && (
        <PopupCard
          onClose={closeRevisionNotes}
          title="Class Selection"
          icon="📝"
          badge={`${selectedRevisionOption === 'keypoints' ? 'Key Points' : selectedRevisionOption === 'flashcards' ? 'Flashcards' : 'Summaries'}`}
        >
          <div className="popup-card-items">
            <RadioOption
                    value="8th"
                    checked={selectedRevisionClass === '8th'}
                    onChange={() => handleRevisionClassSelect('8th')}
              label="8th Standard"
              emoji="🎒"
              hovered={hoveredRevisionClass === '8th'}
              onMouseEnter={() => setHoveredRevisionClass('8th')}
              onMouseLeave={() => setHoveredRevisionClass(null)}
            />
            <RadioOption
                    value="9th"
                    checked={selectedRevisionClass === '9th'}
                    onChange={() => handleRevisionClassSelect('9th')}
              label="9th Standard"
              emoji="📖"
              hovered={hoveredRevisionClass === '9th'}
              onMouseEnter={() => setHoveredRevisionClass('9th')}
              onMouseLeave={() => setHoveredRevisionClass(null)}
            />
            <RadioOption
                    value="10th"
                    checked={selectedRevisionClass === '10th'}
                    onChange={() => handleRevisionClassSelect('10th')}
              label="10th Standard"
              emoji="🎓"
              hovered={hoveredRevisionClass === '10th'}
              onMouseEnter={() => setHoveredRevisionClass('10th')}
              onMouseLeave={() => setHoveredRevisionClass(null)}
                  />
              </div>
              {selectedRevisionClass && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Great choice! 🎉</p>
                </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={handleRevisionClassContinue}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Continue</span>
            </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* Revision Notes Subject Selection */}
      {showRevisionSubjectSelection && (
        <PopupCard
          onClose={closeRevisionNotes}
          onBack={handleRevisionSubjectBack}
          title="Subject Selection"
          icon="📝"
          badge={`${selectedRevisionClass} Standard - ${selectedRevisionOption === 'keypoints' ? 'Key Points' : selectedRevisionOption === 'flashcards' ? 'Flashcards' : 'Summaries'}`}
        >
          <div className="popup-card-items">
            <RadioOption
                    value="maths"
                    checked={selectedRevisionSubject === 'maths'}
                    onChange={() => handleRevisionSubjectSelect('maths')}
              label="Maths"
              emoji="🔢"
              hovered={hoveredRevisionSubject === 'maths'}
              onMouseEnter={() => setHoveredRevisionSubject('maths')}
              onMouseLeave={() => setHoveredRevisionSubject(null)}
            />
            <RadioOption
                    value="science"
                    checked={selectedRevisionSubject === 'science'}
                    onChange={() => handleRevisionSubjectSelect('science')}
              label="Science"
              emoji="🔬"
              hovered={hoveredRevisionSubject === 'science'}
              onMouseEnter={() => setHoveredRevisionSubject('science')}
              onMouseLeave={() => setHoveredRevisionSubject(null)}
            />
            <RadioOption
                    value="social"
                    checked={selectedRevisionSubject === 'social'}
                    onChange={() => handleRevisionSubjectSelect('social')}
              label="Social"
              emoji="🌍"
              hovered={hoveredRevisionSubject === 'social'}
              onMouseEnter={() => setHoveredRevisionSubject('social')}
              onMouseLeave={() => setHoveredRevisionSubject(null)}
            />
            <RadioOption
                    value="english"
                    checked={selectedRevisionSubject === 'english'}
                    onChange={() => handleRevisionSubjectSelect('english')}
              label="English"
              emoji="📖"
              hovered={hoveredRevisionSubject === 'english'}
              onMouseEnter={() => setHoveredRevisionSubject('english')}
              onMouseLeave={() => setHoveredRevisionSubject(null)}
            />
            <RadioOption
                    value="kannada"
                    checked={selectedRevisionSubject === 'kannada'}
                    onChange={() => handleRevisionSubjectSelect('kannada')}
              label="Kannada"
              emoji="📝"
              hovered={hoveredRevisionSubject === 'kannada'}
              onMouseEnter={() => setHoveredRevisionSubject('kannada')}
              onMouseLeave={() => setHoveredRevisionSubject(null)}
                  />
              </div>
        </PopupCard>
      )}

      {/* Model Papers Class Selection */}
      {showModelPapersClassSelection && (
        <PopupCard
          onClose={closeModelPapers}
          title="Class Selection"
          icon="📄"
          badge={selectedPaperOption === 'pastpapers' ? 'Past Papers' : 'Practice Sets'}
        >
          <div className="popup-card-items">
            <RadioOption
                    value="8th"
                    checked={selectedModelPapersClass === '8th'}
                    onChange={() => handleModelPapersClassSelect('8th')}
              label="8th Standard"
              emoji="🎒"
              hovered={hoveredPaperClass === '8th'}
              onMouseEnter={() => setHoveredPaperClass('8th')}
              onMouseLeave={() => setHoveredPaperClass(null)}
            />
            <RadioOption
                    value="9th"
                    checked={selectedModelPapersClass === '9th'}
                    onChange={() => handleModelPapersClassSelect('9th')}
              label="9th Standard"
              emoji="📖"
              hovered={hoveredPaperClass === '9th'}
              onMouseEnter={() => setHoveredPaperClass('9th')}
              onMouseLeave={() => setHoveredPaperClass(null)}
            />
            <RadioOption
                    value="10th"
                    checked={selectedModelPapersClass === '10th'}
                    onChange={() => handleModelPapersClassSelect('10th')}
              label="10th Standard"
              emoji="🎓"
              hovered={hoveredPaperClass === '10th'}
              onMouseEnter={() => setHoveredPaperClass('10th')}
              onMouseLeave={() => setHoveredPaperClass(null)}
                  />
              </div>
              {selectedModelPapersClass && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Great choice! 🎉</p>
                </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={handleModelPapersClassContinue}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Continue</span>
            </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* Model Papers Subject Selection */}
      {showModelPapersSubjectSelection && (
        <PopupCard
          onClose={closeModelPapers}
          onBack={handleModelPapersSubjectBack}
          title="Subject Selection"
          icon="📄"
          badge={`${selectedModelPapersClass} Standard - ${selectedPaperOption === 'pastpapers' ? 'Past Papers' : 'Practice Sets'}`}
        >
          <div className="popup-card-items">
            <RadioOption
                    value="maths"
                    checked={selectedModelPapersSubject === 'maths'}
                    onChange={() => handleModelPapersSubjectSelect('maths')}
              label="Maths"
              emoji="🔢"
              hovered={hoveredPaperSubject === 'maths'}
              onMouseEnter={() => setHoveredPaperSubject('maths')}
              onMouseLeave={() => setHoveredPaperSubject(null)}
            />
            <RadioOption
                    value="science"
                    checked={selectedModelPapersSubject === 'science'}
                    onChange={() => handleModelPapersSubjectSelect('science')}
              label="Science"
              emoji="🔬"
              hovered={hoveredPaperSubject === 'science'}
              onMouseEnter={() => setHoveredPaperSubject('science')}
              onMouseLeave={() => setHoveredPaperSubject(null)}
            />
            <RadioOption
                    value="social"
                    checked={selectedModelPapersSubject === 'social'}
                    onChange={() => handleModelPapersSubjectSelect('social')}
              label="Social"
              emoji="🌍"
              hovered={hoveredPaperSubject === 'social'}
              onMouseEnter={() => setHoveredPaperSubject('social')}
              onMouseLeave={() => setHoveredPaperSubject(null)}
            />
            <RadioOption
                    value="english"
                    checked={selectedModelPapersSubject === 'english'}
                    onChange={() => handleModelPapersSubjectSelect('english')}
              label="English"
              emoji="📖"
              hovered={hoveredPaperSubject === 'english'}
              onMouseEnter={() => setHoveredPaperSubject('english')}
              onMouseLeave={() => setHoveredPaperSubject(null)}
            />
            <RadioOption
                    value="kannada"
                    checked={selectedModelPapersSubject === 'kannada'}
                    onChange={() => handleModelPapersSubjectSelect('kannada')}
              label="Kannada"
              emoji="📝"
              hovered={hoveredPaperSubject === 'kannada'}
              onMouseEnter={() => setHoveredPaperSubject('kannada')}
              onMouseLeave={() => setHoveredPaperSubject(null)}
                  />
              </div>
          {selectedModelPapersSubject && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Great choice! 🎉</p>
          </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={handleModelPapersSubjectContinue}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Continue</span>
        </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* Concept Zone Popup */}
      {showConceptZone && (
        <PopupCard
          onClose={closeConceptZone}
          title="Concept Zone"
          icon="💡"
        >
          <div className="popup-card-items">
            <RadioOption
              value="concept1"
              checked={selectedConcept === 'concept1'}
              onChange={() => handleConceptSelect('concept1')}
              label="Concept 1"
              emoji="💡"
              hovered={hoveredConcept === 'concept1'}
              onMouseEnter={() => setHoveredConcept('concept1')}
              onMouseLeave={() => setHoveredConcept(null)}
            />
            <RadioOption
              value="concept2"
              checked={selectedConcept === 'concept2'}
              onChange={() => handleConceptSelect('concept2')}
              label="Concept 2"
              emoji="💡"
              hovered={hoveredConcept === 'concept2'}
              onMouseEnter={() => setHoveredConcept('concept2')}
              onMouseLeave={() => setHoveredConcept(null)}
            />
            <RadioOption
              value="concept3"
              checked={selectedConcept === 'concept3'}
              onChange={() => handleConceptSelect('concept3')}
              label="Concept 3"
              emoji="💡"
              hovered={hoveredConcept === 'concept3'}
              onMouseEnter={() => setHoveredConcept('concept3')}
              onMouseLeave={() => setHoveredConcept(null)}
                  />
              </div>
              {selectedConcept && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Great choice! 🎉</p>
                </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={handleConceptContinue}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Continue</span>
            </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* Concept Zone Class Selection */}
      {showConceptZoneClassSelection && (
        <PopupCard
          onClose={closeConceptZone}
          onBack={handleConceptZoneClassBack}
          title="Class Selection"
          icon="💡"
        >
          <div className="popup-card-items">
            <RadioOption
                    value="8th"
                    checked={selectedConceptZoneClass === '8th'}
                    onChange={() => handleConceptZoneClassSelect('8th')}
              label="8th Standard"
              emoji="🎒"
              hovered={hoveredConceptClass === '8th'}
              onMouseEnter={() => setHoveredConceptClass('8th')}
              onMouseLeave={() => setHoveredConceptClass(null)}
            />
            <RadioOption
                    value="9th"
                    checked={selectedConceptZoneClass === '9th'}
                    onChange={() => handleConceptZoneClassSelect('9th')}
              label="9th Standard"
              emoji="📖"
              hovered={hoveredConceptClass === '9th'}
              onMouseEnter={() => setHoveredConceptClass('9th')}
              onMouseLeave={() => setHoveredConceptClass(null)}
            />
            <RadioOption
                    value="10th"
                    checked={selectedConceptZoneClass === '10th'}
                    onChange={() => handleConceptZoneClassSelect('10th')}
              label="10th Standard"
              emoji="🎓"
              hovered={hoveredConceptClass === '10th'}
              onMouseEnter={() => setHoveredConceptClass('10th')}
              onMouseLeave={() => setHoveredConceptClass(null)}
            />
            </div>
          {selectedConceptZoneClass && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Great choice! 🎉</p>
          </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={handleConceptZoneClassContinue}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Continue</span>
        </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* Concept Zone Subject Selection */}
      {showConceptZoneSubjectSelection && (
        <PopupCard
          onClose={closeConceptZone}
          onBack={handleConceptZoneClassContinue}
          title="Subject Selection"
          icon="💡"
          badge={`${selectedConceptZoneClass} Standard`}
        >
          <div className="popup-card-items">
            <RadioOption
                    value="maths"
                    checked={selectedConceptZoneSubject === 'maths'}
                    onChange={() => handleConceptZoneSubjectSelect('maths')}
              label="Maths"
              emoji="🔢"
              hovered={hoveredConceptSubject === 'maths'}
              onMouseEnter={() => setHoveredConceptSubject('maths')}
              onMouseLeave={() => setHoveredConceptSubject(null)}
            />
            <RadioOption
                    value="science"
                    checked={selectedConceptZoneSubject === 'science'}
                    onChange={() => handleConceptZoneSubjectSelect('science')}
              label="Science"
              emoji="🔬"
              hovered={hoveredConceptSubject === 'science'}
              onMouseEnter={() => setHoveredConceptSubject('science')}
              onMouseLeave={() => setHoveredConceptSubject(null)}
            />
            <RadioOption
                    value="social"
                    checked={selectedConceptZoneSubject === 'social'}
                    onChange={() => handleConceptZoneSubjectSelect('social')}
              label="Social"
              emoji="🌍"
              hovered={hoveredConceptSubject === 'social'}
              onMouseEnter={() => setHoveredConceptSubject('social')}
              onMouseLeave={() => setHoveredConceptSubject(null)}
            />
            <RadioOption
                    value="english"
                    checked={selectedConceptZoneSubject === 'english'}
                    onChange={() => handleConceptZoneSubjectSelect('english')}
              label="English"
              emoji="📖"
              hovered={hoveredConceptSubject === 'english'}
              onMouseEnter={() => setHoveredConceptSubject('english')}
              onMouseLeave={() => setHoveredConceptSubject(null)}
            />
            <RadioOption
                    value="kannada"
                    checked={selectedConceptZoneSubject === 'kannada'}
                    onChange={() => handleConceptZoneSubjectSelect('kannada')}
              label="Kannada"
              emoji="📝"
              hovered={hoveredConceptSubject === 'kannada'}
              onMouseEnter={() => setHoveredConceptSubject('kannada')}
              onMouseLeave={() => setHoveredConceptSubject(null)}
                  />
              </div>
          {selectedConceptZoneSubject && (
            <>
              <div className="popup-card-confirm">
                <p className="popup-card-confirm-text">Great choice! 🎉</p>
              </div>
              <button 
                className="popup-card-cta-wrapper"
                onClick={handleConceptZoneSubjectContinue}
              >
                <div className="popup-card-cta-shadow"></div>
                <div className="popup-card-cta-btn">
                  <span className="popup-card-cta-text">Continue</span>
                </div>
              </button>
            </>
          )}
        </PopupCard>
      )}

      {/* Main Content Section - Clean White Design */}
      <div className="home-main-container">
        
        {/* Header Section */}
        <div className="home-header">
          <div className="home-header-badge">
            <Sparkles size={14} />
            <span>Future of Learning</span>
              </div>
                </div>

        <div className="home-content-wrapper">
          
          {/* LEFT SIDE: CONTENT & CARDS */}
          <div className="home-left-content">
            
            {/* Header Text */}
            <div className="home-header-section">
              <h1 className="home-main-title">
                Lets <span className="home-title-highlight">E-Shala</span> at <br/>your home
          </h1>
              
              <p className="home-description">
                Unlock your potential with our comprehensive digital library. 
                Textbooks, premium lessons, and revision tools—curated for excellence.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="home-cards-grid">
              
              {/* Card 1: Textbooks */}
              <div 
                onClick={handleTextbookClick}
                className="home-feature-card home-card-textbooks"
              >
                <div className="home-card-icon-wrapper">
                  <BookOpen size={24} />
              </div>
                <div className="home-card-content">
                  <h3 className="home-card-title">Textbooks</h3>
                  <p className="home-card-subtitle">Digital Library</p>
            </div>
              </div>

              {/* Card 2: Video Lessons */}
              <div 
                onClick={() => setShowVideoPlayer(true)}
                className="home-feature-card home-card-video"
              >
                <div className="home-card-badge-pulse"></div>
                <div className="home-card-icon-wrapper">
                  <Video size={24} />
            </div>
                <div className="home-card-content">
                  <h3 className="home-card-title">Video Lessons</h3>
                  <p className="home-card-subtitle">Premium Content</p>
              </div>
            </div>

              {/* Card 3: Revision Notes */}
              <div 
                onClick={handleRevisionNotesClick}
                className="home-feature-card home-card-notes"
              >
                <div className="home-card-icon-wrapper">
                  <FileText size={24} />
              </div>
                <div className="home-card-content">
                  <h3 className="home-card-title">Revision Notes</h3>
                  <p className="home-card-subtitle">Quick Summaries</p>
            </div>
              </div>

              {/* Card 4: Model Papers */}
              <div 
                onClick={handleModelPapersClick}
                className="home-feature-card home-card-papers"
              >
                <div className="home-card-icon-wrapper">
                  <ClipboardList size={24} />
            </div>
                <div className="home-card-content">
                  <h3 className="home-card-title">Model Papers</h3>
                  <p className="home-card-subtitle">Exam Practice</p>
          </div>
        </div>

              {/* Card 5: Practice Tests */}
              <div 
                onClick={(e) => handleNavClick(e, 'Practice Tests')}
                className="home-feature-card home-card-practice"
              >
                <div className="home-card-icon-wrapper">
                  <HelpCircle size={24} />
              </div>
                <div className="home-card-content">
                  <h3 className="home-card-title">Practice Tests</h3>
                  <p className="home-card-subtitle">Test Your Knowledge</p>
            </div>
          </div>

              {/* Card 6: Study Planner */}
              <div 
                onClick={(e) => handleNavClick(e, 'Study Planner')}
                className="home-feature-card home-card-planner"
              >
                <div className="home-card-icon-wrapper">
                  <Calendar size={24} />
        </div>
                <div className="home-card-content">
                  <h3 className="home-card-title">Study Planner</h3>
                  <p className="home-card-subtitle">Organize Your Time</p>
      </div>
            </div>

              {/* Card 7: Progress Tracker */}
              <div 
                onClick={(e) => handleNavClick(e, 'Progress Tracker')}
                className="home-feature-card home-card-progress"
              >
                <div className="home-card-icon-wrapper">
                  <BarChart3 size={24} />
              </div>
                <div className="home-card-content">
                  <h3 className="home-card-title">Progress Tracker</h3>
                  <p className="home-card-subtitle">Track Your Growth</p>
            </div>
              </div>

              {/* Card 8: Achievements */}
              <div 
                onClick={(e) => handleNavClick(e, 'Achievements')}
                className="home-feature-card home-card-achievements"
              >
                <div className="home-card-icon-wrapper">
                  <Award size={24} />
            </div>
                <div className="home-card-content">
                  <h3 className="home-card-title">Achievements</h3>
                  <p className="home-card-subtitle">Earn Badges</p>
          </div>
        </div>

              {/* Card 9: Key Points */}
              <div 
                onClick={() => {
                  setSelectedVideoOption('keypoints');
                  setShowVideoLessonsClassSelection(true);
                }}
                className="home-feature-card home-card-keypoints"
              >
                <div className="home-card-icon-wrapper">
                  <Star size={24} />
              </div>
                <div className="home-card-content">
                  <h3 className="home-card-title">Key Points</h3>
                  <p className="home-card-subtitle">Important Highlights</p>
            </div>
          </div>

              {/* Card 10: Flashcards */}
              <div 
                onClick={() => {
                  setSelectedVideoOption('flashcards');
                  setShowVideoLessonsClassSelection(true);
                }}
                className="home-feature-card home-card-flashcards"
              >
                <div className="home-card-icon-wrapper">
                  <Layers size={24} />
        </div>
                <div className="home-card-content">
                  <h3 className="home-card-title">Flashcards</h3>
                  <p className="home-card-subtitle">Quick Revision</p>
      </div>
        </div>

              {/* Card 11: Summaries */}
              <div 
                onClick={() => {
                  setSelectedVideoOption('summaries');
                  setShowVideoLessonsClassSelection(true);
                }}
                className="home-feature-card home-card-summaries"
              >
                <div className="home-card-icon-wrapper">
                  <ScrollText size={24} />
              </div>
                <div className="home-card-content">
                  <h3 className="home-card-title">Summaries</h3>
                  <p className="home-card-subtitle">Chapter Overview</p>
            </div>
          </div>

              {/* Card 12: Past Papers */}
              <div 
                onClick={() => {
                  setSelectedPaperOption('pastpapers');
                  setShowModelPapersClassSelection(true);
                }}
                className="home-feature-card home-card-pastpapers"
              >
                <div className="home-card-icon-wrapper">
                  <FileCheck size={24} />
        </div>
                <div className="home-card-content">
                  <h3 className="home-card-title">Past Papers</h3>
                  <p className="home-card-subtitle">Previous Exams</p>
      </div>
          </div>

              {/* Card 13: Practice Sets */}
              <div 
                onClick={() => {
                  setSelectedPaperOption('practicesets');
                  setShowModelPapersClassSelection(true);
                }}
                className="home-feature-card home-card-practicesets"
              >
                <div className="home-card-icon-wrapper">
                  <ClipboardList size={24} />
        </div>
                <div className="home-card-content">
                  <h3 className="home-card-title">Practice Sets</h3>
                  <p className="home-card-subtitle">Mock Tests</p>
      </div>
            </div>

              {/* Card 14: Concept Zone (Wide) */}
              <div 
                onClick={handleConceptZoneClick}
                className="home-feature-card home-card-concept home-card-wide"
              >
                <div className="home-card-content-wide">
                  <div className="home-card-icon-wrapper home-card-icon-large">
                    <Lightbulb size={28} />
              </div>
                  <div>
                    <h3 className="home-card-title home-card-title-large">Concept Zone</h3>
                    <p className="home-card-subtitle">Deep dive into complex topics</p>
            </div>
              </div>
                <div className="home-card-arrow">
                  <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </div>

          {/* RIGHT SIDE: FEATURE VISUAL */}
          <div className="home-right-content">
            <div className="home-image-container">
              <div className="home-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" 
                  alt="Student Learning" 
                  className="home-student-image"
                />
                
                {/* Floating Info Card */}
                <div className="home-image-info-card">
                  <div className="home-info-badge">
                    <div className="home-info-dot"></div>
                    <span>Live Now</span>
              </div>
                  <p>Join 10k+ students learning visually.</p>
            </div>
          </div>
        </div>
      </div>
          </div>
        </div>

      {/* Video Player */}
      {showVideoPlayer && (
        <VideoPlayer
          src={videoSource}
          title={getVideoTitle()}
          onClose={closeVideoPlayer}
        />
      )}
    </div>
  );
}

export default Home;
