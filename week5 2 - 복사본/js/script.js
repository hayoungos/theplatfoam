$(document).ready(function () {
    let containerCount = 1; // 현재 컨테이너 수
    const maxContainers = 5; // 최대 생성 컨테이너 수
    const containerHeight = $(".container").outerHeight(); // 컨테이너 높이
    const containerGap = 100; // 컨테이너 간 간격
    const scrollSpeed = 10; // 컨테이너 스크롤 속도 조정
    let gradientPosition = 50; // 배경 그라디언트의 초기 위치 (%)
    let totalScroll = 0; // 누적된 스크롤 값을 추적
  
    // 초기 컨테이너 위치 설정
    $(".container").css("top", "0px");
  
    // 마우스 휠 이벤트 처리
    $(window).on("wheel", function (event) {
      const deltaY = event.originalEvent.deltaY; // 마우스 휠의 Y 변화량
  
      // 누적 스크롤 값 갱신
      totalScroll += deltaY;
  
      // 위로 스크롤 제한 (totalScroll이 0보다 작아지지 않도록 방지)
      if (totalScroll < 0) {
        totalScroll = 0;
        return; // 위로 스크롤을 막음
      }
  
      // 모든 컨테이너 위로 이동
      $(".container").each(function () {
        const newTop = parseFloat($(this).css("top")) - deltaY / scrollSpeed;
        $(this).css("top", `${newTop}px`);
      });
  
      // 배경 그라디언트 위치 변경
      gradientPosition += deltaY / 50; // 스크롤에 따라 위치 조정
      if (gradientPosition < 0) gradientPosition = 0; // 최소값 제한
      if (gradientPosition > 100) gradientPosition = 100; // 최대값 제한
      $("body").css("background-position", `0% ${gradientPosition}%`);
  
      // 맨 아래 컨테이너가 화면 밖으로 이동하면 새 컨테이너 추가
      const lastContainerTop = parseFloat($(".container").last().css("top")) || 0;
      if (lastContainerTop < $(window).height() && containerCount < maxContainers) {
        addNewContainer();
        containerCount++;
      }
    });
  
    // 새 컨테이너를 추가하는 함수
    function addNewContainer() {
      const newContainer = $(".container").first().clone(); // 기존 컨테이너 복제
      const lastContainerTop = parseFloat($(".container").last().css("top")) || 0;
      const newTop = lastContainerTop + containerHeight + containerGap; // 간격 추가
      newContainer.css({
        top: `${newTop}px`, // 새 위치 설정
        transform: "none", // 기존 애니메이션 제거
      });
      $("body").append(newContainer); // 새 컨테이너 추가
    }
  });